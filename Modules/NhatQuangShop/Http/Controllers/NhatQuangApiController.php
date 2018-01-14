<?php

namespace Modules\NhatQuangShop\Http\Controllers;


use App\Category;
use App\Coupon;
use App\District;
use App\Good;
use App\GoodCategory;
use App\Http\Controllers\PublicApiController;
use App\Province;
use Illuminate\Http\Request;
use Modules\Good\Entities\GoodProperty;
use Modules\NhatQuangShop\Repositories\BookRepository;

class NhatQuangApiController extends PublicApiController
{
    private $bookRepository;

    public function __construct(BookRepository $bookRepository)
    {
        $this->bookRepository = $bookRepository;
    }

    public function content($couponProgram)
    {
        switch ($couponProgram->used_for) {
            case 'order':
                return ' đơn hàng giá trị trên ' . currency_vnd_format($couponProgram->order_value);
                break;
            case 'category':
                return ' danh mục ' . $couponProgram->goodCategory->name;
                break;
            case 'good':
                return ' sản phẩm ' . $couponProgram->good->name;
                break;
            default:
                return '';
                break;
        }
    }

    public function flush(Request $request)
    {
        $request->session()->flush();
    }

    public function getCouponProgram()
    {
        $couponPrograms = Coupon::where('type', 'program')->where('activate', 1)->get();
        return [
            'coupon_programs' => $couponPrograms->map(function ($couponProgram) {
                $data = $couponProgram->getData();
                $data['content'] = $couponProgram->name
                    . ': giảm giá '
                    . ($couponProgram->discount_type == 'fix' ? currency_vnd_format($couponProgram->discount_value) : $couponProgram->discount_value . '%')
                    . $this->content($couponProgram);
                return $data;
            }),
            'coupon_programs_count' => $couponPrograms->count(),
        ];
    }

    public function countGoodsFromSession(Request $request)
    {
        $goods_str = $request->session()->get('goods');
        $goods = json_decode($goods_str);
        $count = 0;
        if ($goods) {
            foreach ($goods as $good) {
                $count += $good->number;
            }
        }
        return $count;
    }

    public function getGoodsFromSession(Request $request)
    {
        $goods_str = $request->session()->get('goods');
        $goods_arr = json_decode($goods_str);
        $goods = [];
        if ($goods_arr) {
            foreach ($goods_arr as $item) {
                $good = Good::find($item->id);
                $good->number = $item->number;
//                $good->price = $item->price;
//                $good->discount_price = $item->discount_price;
                $properties = GoodProperty::where('good_id', $good->id)->get();
                foreach ($properties as $property) {
                    $good[$property->name] = $property->value;
                }
                $good->vnd_price = currency_vnd_format($good->price);
                $good->total_price = $good->price * $good->number;
                $good->total_vnd_price = currency_vnd_format($good->price * $good->number);
                $goods[] = $good;
            }
        }

        $totalPrice = 0;

        foreach ($goods as $good) {
            $totalPrice += $good->price * (1 - $good["coupon_value"]) * $good->number;
        }
        $totalVndPrice = currency_vnd_format($totalPrice);
        $data = [
            "goods" => $goods,
            "total_order_price" => $totalPrice,
            "total_order_vnd_price" => $totalVndPrice,
        ];
        return $data;
    }

    public function addGoodToCart($goodId, Request $request)
    {
        $goods_str = $request->session()->get('goods');

        if ($goods_str) {
            $goods = json_decode($goods_str);
        } else {
            $goods = [];
        }
        $added = false;
        foreach ($goods as &$good) {
            if ($good->id == $goodId) {
                $good->number += 1;
                $added = true;
            }
        }
        if (!$added) {
            $temp = new \stdClass();
            $product = Good::find($goodId);
            $temp->id = $goodId;
            $temp->number = 1;
//            $temp->price = $product->price;
//            $temp->discount_price = $product->discount_price;
            $goods[] = $temp;
        }
        $goods_str = json_encode($goods);
        $request->session()->put('goods', $goods_str);
        return ["status" => 1];
    }

    public function removeBookFromCart($goodId, Request $request)
    {
        $goods_str = $request->session()->get('goods');

        $goods = json_decode($goods_str);

        $new_goods = [];

        foreach ($goods as &$good) {
            if ($good->id == $goodId) {
                $good->number -= 1;
            }
            if ($good->number > 0) {
                $temp = new \stdClass();
                $temp->id = $good->id;
                $temp->number = $good->number;
//                $temp->price = $good->price;
//                $temp->discount_price = $good->discount_price;
                $new_goods[] = $temp;
            }
        }

        $goods_str = json_encode($new_goods);
        $request->session()->put('goods', $goods_str);
        return ["status" => 1];
    }

    public function saveOrder(Request $request)
    {
        //code phan api dat sach o day hihi
        $email = $request->email;
        $name = $request->name;
        $phone = preg_replace('/[^0-9]+/', '', $request->phone);
        $province = Province::find($request->provinceid)->name;
        $district = District::find($request->districtid)->name;
        $address = $request->address;
        $payment = $request->payment;
        $goods_str = $request->session()->get('goods');
        $goods_arr = json_decode($goods_str);
        if (count($goods_arr) > 0) {
            $this->bookRepository->saveOrder($email, $phone, $name, $province, $district, $address, $payment, $goods_arr);
            $request->session()->flush();
            return [
                "status" => 1
            ];
        } else {
            return [
                "status" => 0,
                "message" => "Bạn chưa đặt cuốn sách nào"
            ];
        }
    }

    public function provinces()
    {
        $provinces = Province::get();
        return [
            'provinces' => $provinces,
        ];
    }

    public function districts($provinceId)
    {
        $province = Province::find($provinceId);
        return [
            'districts' => $province->districts,
        ];
    }

    public function wards($districtId)
    {
        $district = District::find($districtId);
        return [
            'wards' => $district->wards,
        ];
    }

    public function addCouponCode($couponName, Request $request)
    {
        $couponCodes_str = $request->session()->get('couponCodes');
        $couponCodes = json_decode($couponCodes_str);

        $coupon = Coupon::where('name', $couponName)->orderBy('created_at', 'desc')->first();
        if ($coupon == null)
            return [
                'status' => 0,
                'message' => 'Không tồn tại mã giảm giá'
            ];
        foreach ($couponCodes as $couponCode)
            if ($couponCode->id == $coupon->id)
                return [
                    'status' => 0,
                    'message' => 'Mã giảm giá đã được thêm',
                ];
        $temp = new \stdClass();
        $temp->id = $coupon->id;
        $temp->content = 'Mã '
            . $coupon->name
            . ': giảm giá '
            . ($coupon->discount_type == 'fix' ? currency_vnd_format($coupon->discount_value) : $coupon->discount_value . '%')
            . $this->content($coupon);
        $temp->used = false;
        $couponCodes[] = $temp;

        $couponCodes_str = json_encode($couponCodes);
        $request->session()->put('couponCodes', $couponCodes_str);
        return [
            'status' => 1,
            'message' => 'Thêm mã thành công'
        ];
    }

    public function removeCouponCode($couponId, Request $request)
    {
        $couponCodes_str = $request->session()->get('couponCodes');
        $couponCodes = json_decode($couponCodes_str);

        $newCouponCodes = [];

        foreach ($couponCodes as $couponCode) {
            if ($couponCode->id == $couponId)
                continue;
            $newCouponCodes[] = $couponCode;
        }

        $couponCodes_str = json_encode($newCouponCodes);
        $request->session()->put('couponCodes', $couponCodes_str);
        return [
            "status" => 1
        ];
    }

    public function isApply($good, $couponCode)
    {
        if ($couponCode->used_for == 'all')
            return true;
        if ($couponCode->used_for == 'good' && $couponCode->good_id == $good->id)
            return true;
        if ($couponCode->used_for == 'categories') {
            if ($good->category_id == 0)
                return false;
            $category_id = $good->category_id;
            while ($category_id != 0) {
                if ($category_id == $couponCode->category_id)
                    return true;
                $category_id = GoodCategory::find($category_id)->parent_id;
            }
        }
        return false;
    }

    public function applyCoupons(Request $request)
    {
//        $goods_str = $request->session()->get('goods');
//
//        if ($goods_str) {
//            $goods = json_decode($goods_str);
//        } else {
//            $goods = [];
//        }
//
//        $couponCodes_str = $request->session()->get('couponCodes');
//
//        if ($couponCodes_str) {
//            $couponCodes = json_decode($goods_str);
//        } else {
//            $couponCodes = [];
//        }
//
//        foreach ($goods as $good) {
//            $sharedCoupons = [];
//            $notSharedCoupons = [];
//
//            $objGood = Good::find($good->id);
//            foreach ($couponCodes as $couponCode) {
//                $objCouponCode = Coupon::find($couponCode->id);
//                if ($this->isApply($objGood, $objCouponCode)) {
//                    if($objCouponCode->shared === 1)
//                        $sharedCoupons[] = $couponCode;
//                    else
//                        $notSharedCoupons[] = $couponCode;
//                }
//            }
//
//            $couponPrograms = Coupon::where('type', 'program')->where('activate', 1)->get();
//            foreach ($couponPrograms as $couponProgram) {
//                if ($this->isApply($objGood, $couponProgram)) {
//                    $temp = new \stdClass();
//                    $temp->id = $couponProgram->id;
//                    $temp->used = false;
//                    if($couponProgram->shared === 1)
//                        $sharedCoupons[] = $temp;
//                    else
//                        $notSharedCoupons[] = $temp;
//                }
//            }
//
//
//        }
    }
}