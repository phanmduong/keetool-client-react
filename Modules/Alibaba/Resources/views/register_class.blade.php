@extends('alibaba::layouts.master')

@section('content')
    <div class="cd-section section-white" id="contact-us">
        <div class="contactus-1 section-image"
             style="background-image: url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?dpr=1&amp;auto=format&amp;fit=crop&amp;w=1500&amp;h=996&amp;q=80&amp;cs=tinysrgb&amp;crop=')">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card card-contact no-transition">
                            <h3 class="card-title text-center">Đăng kí học viên lớp {{$class->name}}</h3>
                            <div id="container-form-register">
                                <div class="row">
                                    <div class="col-md-5 offset-md-1">
                                        <div class="card-block">
                                            <div class="info info-horizontal">
                                                <div class="icon icon-info" style="color:#c50000">
                                                    <i class="nc-icon nc-pin-3" aria-hidden="true"></i>
                                                </div>
                                                <div class="description">
                                                    <h4 class="info-title">Địa chỉ của chúng tôi</h4>
                                                    <p> 186 Giải Phóng<br>
                                                        Hai Bà Trưng<br>
                                                        Hà Nội
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="info info-horizontal">
                                                <div class="icon icon-danger" style="color:#c50000">
                                                    <i class="nc-icon nc-badge" aria-hidden="true"></i>
                                                </div>
                                                <div class="description">
                                                    <h4 class="info-title">Hotline</h4>
                                                    <p>
                                                        02422 391 999<br>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-5">
                                        <form role="form" id="contact-form" method="post"
                                              action="{{url('/store-register')}}">
                                            <input type="hidden" name="_token" value="{{ csrf_token() }}">
                                            <input type="hidden" name="class_id" value={{$class->id}}>
                                            <input type="hidden" name="saler_id" value={{$saler_id}}>
                                            <input type="hidden" name="campaign_id" value={{$campaign_id}}>
                                            <div class="card-block">
                                                <div class="form-group label-floating">
                                                    <label class="control-label">Địa chỉ email</label>
                                                    <input type="email" name="email" class="form-control"
                                                           placeholder="Ví dụ: abc@gmail.com" value="{{old('email')}}">
                                                    @if ($errors->has('email'))
                                                        @if(empty(old('email')))
                                                            <strong class="text-danger">Xin bạn vui lòng điền Email</strong>
                                                        @else
                                                            <strong class="text-danger">{{$errors->first('email')}}</strong>
                                                        @endif
                                                    @endif
                                                </div>
                                                <div class="form-group label-floating">
                                                    <label class="control-label">Họ và tên</label>
                                                    <input type="text" name="name" class="form-control"
                                                           placeholder="Ví dụ: abc@gmail.com" value="{{old('name')}}">
                                                    @if ($errors->has('name'))
                                                        <strong class="text-danger">Xin bạn vui lòng điền họ và tên</strong>
                                                    @endif
                                                </div>
                                                <div class="form-group label-floating">
                                                    <label class="control-label">Số điện thoại</label>
                                                    <input type="tel" name="phone" class="form-control"
                                                           placeholder="Ví dụ: 0123456789" value="{{old('phone')}}">
                                                    @if ($errors->has('phone'))
                                                        <strong class="text-danger">Xin bạn vui lòng điền số điện
                                                            thoại</strong>
                                                    @endif
                                                </div>
                                                <div class="form-group label-floating">
                                                    <label class="control-label">Ngày sinh</label>
                                                    <input type="date" name="dob" class="form-control"
                                                           value="{{old('dob')}}">
                                                    @if ($errors->has('dob'))
                                                        <strong class="text-danger">Xin bạn vui lòng chọn ngày sinh</strong>
                                                    @endif
                                                </div>
                                                <div class="form-group label-floating">
                                                    <label class="control-label">Giới tính</label>
                                                    <select name="gender"class="form-control">
                                                        <option value="Chọn giới tính của bạn">Chọn giới tính của bạn</option>
                                                        <option value="Nam">Nam</option>
                                                        <option value="Nữ">Nữ</option>
                                                        <option value="Khác">Khác</option>
                                                    </select>
                                                </div>
                                                <div class="form-group label-floating">
                                                    <label class="control-label">Trường học</label>
                                                    <input type="text" name="university" class="form-control"
                                                           placeholder="Trường học" value="{{old('university')}}">
                                                    @if ($errors->has('university'))
                                                        <strong class="text-danger">Xin bạn vui lòng điền trường học</strong>
                                                    @endif
                                                </div>
                                                <div class="form-group label-floating">
                                                    <label class="control-label">Nơi làm việc</label>
                                                    <input type="text" name="work" class="form-control"
                                                           placeholder="Nơi làm việc (không bắt buộc)" value="{{old('work')}}">
                                                </div>
                                                <div class="form-group label-floating">
                                                    <label class="control-label">Địa chỉ</label>
                                                    <input type="text" name="address" class="form-control"
                                                           placeholder="Địa chỉ" value="{{old('address')}}">
                                                    @if ($errors->has('address'))
                                                        <strong class="text-danger">Xin bạn vui lòng điền địa chỉ</strong>
                                                    @endif
                                                </div>
                                                <div class="form-group label-floating">
                                                    <label class="control-label">Link facebook</label>
                                                    <input type="text" name="facebook" class="form-control"
                                                           placeholder="Ví dụ: facebook.com/dat123" value="{{old('facebook')}}">
                                                    @if ($errors->has('address'))
                                                        <strong class="text-danger">Xin bạn vui lòng điền link facebook</strong>
                                                    @endif
                                                </div>
                                                <div class="form-group label-floating">
                                                    <label class="control-label">Xin bạn vui lòng chọn lý do bạn biết đến Alibaba</label>
                                                    <select name="how_know"class="form-control">
                                                        <option value="Bạn bè giới thiệu">Bạn bè giới thiệu</option>
                                                        <option value="Fanpage NEU Confessions">Fanpage NEU Confessions</option>
                                                        <option value="ColorMe">ColorMe</option>
                                                        <option value="VEO">VEO</option>
                                                        <option value="Khác">Khác</option>
                                                    </select>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                    </div>
                                                    <div class="col-md-6">
                                                        <button type="submit" class="btn btn-primary pull-right">Gửi tin
                                                            nhắn
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>
        $(document).ready(function () {
            $("form").submit(function () {
                $('#container-form-register').html("<strong class='green-text'>Bạn vui lòng chờ 1 chút, đơn đăng kí đang được gửi</strong>");
            });
        });
    </script>
@endsection