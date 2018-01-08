<?php

namespace Modules\NhatQuangShop\Http\Controllers;

use App\Good;
use App\Order;
use App\Product;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Modules\Good\Entities\GoodProperty;
use Modules\Graphics\Repositories\BookRepository;
use Illuminate\Pagination\LengthAwarePaginator;

class NhatQuangShopManageController extends Controller
{
    private $bookRepository;
    protected $data;
    protected $user;

    public function __construct(BookRepository $bookRepository)
    {
        $this->middleware('auth');
        $this->bookRepository = $bookRepository;
        $this->data = array();

        if (!empty(Auth::user())) {
            $this->user = Auth::user();
            $this->data['user'] = $this->user;
        }
    }

    public function userOrder(Request $request)
    {
        $user = Auth::user();
        $orders = Order::where('user_id', '=', $user->id)->orderBy('created_at', 'desc')->paginate(5);
        $this->data['orders'] = $orders;
        return view("nhatquangshop::orders", $this->data);
    }

    public function infoOrder($order_id)
    {
        $order = Order::find($order_id);
        $this->data['order'] = $order;
        $paidOrderMoneys = $order->orderPaidMoneys;
        $totalPaidMoney = 0;
        if (count($paidOrderMoneys) > 0) {
            for ($i = 0; $i < count($paidOrderMoneys); $i++) {
                $totalPaidMoney += $paidOrderMoneys[$i]->money;
            }
        }
        $this->data['totalPaidMoney'] = $totalPaidMoney;
        $this->data['paidOrderMoneys'] = $paidOrderMoneys;
        return view("nhatquangshop::infoOrder", $this->data);
    }

    public function account_information(){
        $user = Auth::user();
        $this->data['user'] = $user;
        return view("nhatquangshop::account", $this->data);
    }

    public function get_account_change_information(){
        $user = Auth::user();
        $this->data['user'] = $user;
        return view("nhatquangshop::account_change", $this->data);
    }

    public function account_change_information(Request $request){
        $user = Auth::user();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->address = $request->address;
        $user->save();
        $this->data['user'] = $user;
        return view("nhatquangshop::account", $this->data);
    }

    public function get_password_change(){
        return view("nhatquangshop::password_change");
    }

    public function password_change(Request $request){
        $validator = Validator::make($request->all(), [
            'password' => 'required|min:6',
            'newPassword' => 'required|min:6',
            'againPassword' => 'required|same:newPassword|min:6'
        ], [
                'password.required' => 'Bạn chưa nhập mật khẩu hiện tại',
                'newPassword.required' => 'Bạn chưa nhập mật khẩu mới',
                'againPassword.required' => 'Bạn chưa nhập mật khẩu xác nhận',
                'password.min' => 'Mật khẩu phải có ít nhất 6 ký tự',
                'newPassword.min' => 'Mật khẩu phải có ít nhất 6 ký tự',
                'againPassword.min' => 'Mật khẩu phải có ít nhất 6 ký tự',
                'againPassword.same' => 'Mật khẩu xác nhận không chính xác',
            ]
        );
        if ($validator->fails()) {
            return redirect('/manage/password_change')
                ->withInput()
                ->withErrors($validator);
        }
        $user = Auth::user();
        $nowPassword = Hash::make($user->password);
        if ($nowPassword != $user->password) {
            return redirect('/manage/password_change')->with('errors', 'Mật khẩu hiện tại không chính xác');
        }
        $user->password = bcrypt($request->password);
        $user->save();
        $this->data['user'] = $user;
        return view("nhatquangshop::account", $this->data);
    }
}
