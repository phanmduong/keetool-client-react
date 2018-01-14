<?php
/**
 * Created by PhpStorm.
 * User: caoanhquan
 * Date: 8/2/16
 * Time: 11:50
 */

namespace App\Colorme\Transformers;

use App\Order;

class DeliveryOrderTransformer extends Transformer
{
    public function __construct()
    {
    }

    public function transform($deliveryOrder)
    {
        $goodOrders = $deliveryOrder->goodOrders->map(function ($goodOrder) {
            $goodOrderData = [
                'id' => $goodOrder->id,
                'price' => $goodOrder->price,
                'quantity' => $goodOrder->quantity,
                'name' => $goodOrder->good->name,
                'code' => $goodOrder->good->code,
                'link' => $goodOrder->good->download,
            ];
            if ($goodOrder->discount_money)
                $goodOrderData['discount_money'] = $goodOrder->discount_money;
            if ($goodOrder->discount_percent)
                $goodOrderData['discount_percent'] = $goodOrder->discount_percent;
            return $goodOrderData;
        });
        $data = [
            'id' => $deliveryOrder->id,
            'note' => $deliveryOrder->note,
            'label_id' => $deliveryOrder->label_id,
            'code' => $deliveryOrder->code,
            'payment' => $deliveryOrder->payment,
            'created_at' => format_vn_short_datetime(strtotime($deliveryOrder->created_at)),
            'status' => $deliveryOrder->status,
            'total' => $deliveryOrder->goodOrders->reduce(function ($total, $goodOrder) {
                return $total + $goodOrder->price * $goodOrder->quantity;
            }, 0),
            'paid' => $deliveryOrder->orderPaidMoneys->reduce(function ($paid, $orderPaidMoney) {
                return $paid + $orderPaidMoney->money;
            }, 0),
            'debt' => $deliveryOrder->goodOrders->reduce(function ($total, $goodOrder) {
                    return $total + $goodOrder->price * $goodOrder->quantity;
                }, 0) - $deliveryOrder->orderPaidMoneys->reduce(function ($paid, $orderPaidMoney) {
                    return $paid + $orderPaidMoney->money;
                }, 0),
        ];
        if ($goodOrders)
            $data['good_orders'] = $goodOrders;
        if ($deliveryOrder->staff)
            $data['staff'] = [
                'id' => $deliveryOrder->staff->id,
                'name' => $deliveryOrder->staff->name,
            ];
        if ($deliveryOrder->user) {
            $data['customer'] = [
                'id' => $deliveryOrder->user->id,
                'name' => $deliveryOrder->user->name,
                'address' => $deliveryOrder->user->address,
                'phone' => $deliveryOrder->user->phone,
                'email' => $deliveryOrder->user->email,
            ];
        }
        if ($deliveryOrder->ship_infor) {
            $data['ship_infor'] = [
                'name' => $deliveryOrder->ship_infor->name,
                'phone' => $deliveryOrder->ship_infor->phone,
                'province' => $deliveryOrder->ship_infor->province,
                'district' => $deliveryOrder->ship_infor->district,
                'address' => $deliveryOrder->ship_infor->address,
            ];
        }
        return $data;
    }
}