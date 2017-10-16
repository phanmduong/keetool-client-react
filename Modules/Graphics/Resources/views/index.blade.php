@extends('graphics::layouts.master')


@section('content')
    <div class="page-header page-header-xs"
         style="background-image: url('http://d1j8r0kxyu9tj8.cloudfront.net/files/1508035547Sn5EuAfrqhekuNS.png');">
        <div class="filter"></div>
        <div class="content-center">
            <div class="container">
                <br><br>
                <div class="row">
                    <div class="col-md-8 offset-md-2 text-center">
                        <h1 class="title"><b>Tạp chí Graphics</b></h1>
                        <h5 class=description">Cung cấp cho bạn những kiến thức về ngành thiết kế đồ hoạ. Đồng hành cùng
                            bạn trên chặng đường dài.</h5>
                        <br>
                    </div>

                </div>
            </div>
        </div>
    </div>



    <div class="container" id="bookinfo">
        <br><br>
        <div class="row">
            <div class="col-md-12 ">
                <div class="shadow">
                    <input placeholder="Tìm kiếm"
                           style="width:100%; border:none; font-size:20px; padding:15px; color:#2e2e2e"/>
                </div>
            </div>
            <div class="col-md-6">
                <div>
                    <div class="description">
                        <h1 class="medium-title">
                            Sản phẩm nổi bật<br>
                        </h1>
                        <br><a href="#pablo" class="btn btn-link btn-success"
                               style="padding:0!important; margin:0!important">Xem tất cả <i
                                    class="fa fa-angle-right"></i></a><br><br>
                    </div>
                    <br>
                </div>

            </div>

        </div>

        <div class="row">
            @foreach($books as $book)
                <div class="col-md-6 book-item">
                    <div class="card card-profile" style="border-radius:0">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="card card-profile card-plain">
                                        <img class="card-book-image" src="{{$book['avatar']}}">
                                    </div>
                                </div>
                                <div class="col-md-8 text-left">
                                    <br>
                                    <h5 style="font-weight:600">{{$book['name']}}</h5>
                                    <h6>{{$book['short_description']}}</h6><br>
                                    <p>{{$book['description']}}</p>
                                    <h5>{{currency_vnd_format($book['price'])}}</h5><br>
                                </div>

                            </div>
                        </div>
                        <div class="card-footer" style="border-top: 1px solid #dcdbdb!important;">
                            <div style="display:flex;flex-direction:row;justify-content:space-between;">
                                <div>
                                    <a href="http://graphics.vn/book/{{$book['id']}}" class="btn btn-link btn-success">
                                        Xem thêm
                                    </a>
                                    <button onclick="openModalBuy({{$book["id"]}},{{$book["price"]}})"
                                            class="btn btn-sm btn-success">
                                        Đặt mua ngay <i class="fa fa-angle-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>



    <div class="subscribe-line subscribe-line-transparent"
         style="background-image: url('http://d1j8r0kxyu9tj8.cloudfront.net/files/1508035613rkf2In1CptDJTfI.png')">

        <div class="content-center">
            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <div class="card card-profile card-plain">
                            <img class="card-img-top" src="/assets/img/mockup1.png">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div>
                            <div class="description-light">
                                <h1 class="big-title">
                                    Tạp chí đồ hoạ <br> GRAPHICS<br>
                                </h1>
                                <br><h5>CHO NHỮNG NGƯỜI YÊU THÍCH THIẾT KẾ</h5><br>

                                <p>Đã rất lâu trước đó, chúng tôi từng hi vọng sẽ có một ai đó ở Việt Nam viết ra những cuốn sách,
                                những cuốn tạp chí liên quan đến thiết kế đồ họa. Nó phải thật đẹp, có nhiều thông tin hữu ích, để
                                    chúng tôi có thêm cảm hứng, và có thứ để cầm, nắm.</p>
                                <br>
                                <p>Nhưng nhiều năm sau, chúng tôi vẫn không thấy họ xuất hiện. Vì vậy chúng tôi quyết định sẽ không
                                chờ đợi nữa, mà sẽ bắt tay vào tự thực hiện chúng, thứ chúng tôi từng ao ước.</p>
                                <br>
                                <p>Hi vọng lớn nhất, từ chúng tôi, là bạn có được thật nhiều điều thú vị khi đọc cuốn tạp chí này.
                                    Mọi sự giúp đỡ, ủng hộ từ bạn, dù là nhỏ nhất, đều là động lực để chúng tôi cố gắng làm tốt hơn
                                    trong mỗi số của tạp chí.
                                </p>
                                <br>
                                <button type="button" class="btn btn-outline-neutral btn-round">
                                    <i class="fa fa-shopping-cart"></i>
                                    Đặt mua ngay
                                </button>
                            </div>
                            <br>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="container" id="bookinfo1">
        <br><br>
        <div class="row">
            <div class="col-md-6">
                <div>
                    <div class="description">
                        <h1 class="medium-title">
                            Sản phẩm nổi bật<br>
                        </h1>
                        <br><a href="#pablo" class="btn btn-link btn-success"
                               style="padding:0!important; margin:0!important">Xem tất cả <i
                                    class="fa fa-angle-right"></i></a><br><br>
                    </div>
                    <br>
                </div>

            </div>

        </div>
        <div class="row">
            @foreach($books as $book)
                <div class="col-md-6 book-item">
                    <div class="card card-profile" style="border-radius:0">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="card card-profile card-plain">
                                        <img class="card-book-image" src="{{$book['avatar']}}">
                                    </div>
                                </div>
                                <div class="col-md-8 text-left">
                                    <br>
                                    <h5 style="font-weight:600">{{$book['name']}}</h5>
                                    <h6>{{$book['short_description']}}</h6><br>
                                    <p>{{$book['description']}}</p>
                                    <h5>{{currency_vnd_format($book['price'])}}</h5><br>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer" style="border-top: 1px solid #dcdbdb!important;">
                            <div style="display:flex;flex-direction:row;justify-content:space-between;">
                                <div>
                                    <a href="http://graphics.vn/book/{{$book['id']}}" class="btn btn-link btn-success">Xem
                                        thêm</a>
                                    {{--<button data-toggle="modal" data-target="#modalBuy" class="btn btn-sm btn-success">Đặt mua ngay <i class="fa fa-angle-right"></i></button>--}}
                                    <button onclick="openModalBuy({{$book["id"]}},{{$book['price']}})"
                                            class="btn btn-sm btn-success">Đặt
                                        mua ngay <i
                                                class="fa fa-angle-right"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>


    <div class="subscribe-line subscribe-line-transparent"
         style="background-image: url('http://d1j8r0kxyu9tj8.cloudfront.net/files/1508035613rkf2In1CptDJTfI.png')">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2 text-center">
                    <h2 class="big-title description-light">Đội ngũ tác giả</h2><br><br>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4 margin-bottom-30px">
                    <div class="card card-profile ">
                        <div class="card-block">
                            <div class="card-avatar">
                                <a href="#avatar">
                                    <img src="http://d1j8r0kxyu9tj8.cloudfront.net/files/15080356132lM4YvbGXc1oObP.jpg"
                                         alt="...">
                                    <h4 class="card-title">Huyền Thanh</h4>
                                </a>
                            </div>
                            <p class="card-description text-center">
                                <h4><b>Huyền Thanh</b></h4><br>
                                A group becomes a team when each member is sure enough of himself and his contribution
                                to praise the skill of the others. No one can whistle a symphony. It takes an orchestra
                                to play it.
                            </p>
                        </div>
                        <div class="card-footer text-center">
                            <a href="#pablo" class="btn btn-just-icon btn-linkedin"><i class="fa fa-linkedin"></i></a>
                            <a href="#pablo" class="btn btn-just-icon btn-dribbble"><i class="fa fa-dribbble"></i></a>
                            <a href="#pablo" class="btn btn-just-icon btn-instagram"><i class="fa fa-instagram"></i></a>
                        </div>
                    </div>
                </div>

                <div class="col-md-4 margin-bottom-30px">
                    <div class="card card-profile">
                        <div class="card-block">
                            <div class="card-avatar">
                                <a href="#avatar">
                                    <img src="http://d1j8r0kxyu9tj8.cloudfront.net/files/15080356135P12dr5zi9Mj56H.jpg"
                                         alt="...">
                                    <h4 class="card-title">Hoàng Hiệp</h4>
                                </a>
                            </div>
                            <p class="card-description text-center">
                                <h4><b>Hoàng Hiệp</b></h4><br>
                                The strength of the team is each individual member. The strength of each member is the
                                team. If you can laugh together, you can work together, silence isn’t golden, it’s
                                deadly.
                            </p>
                        </div>
                        <div class="card-footer text-center">
                            <a href="#pablo" class="btn btn-just-icon btn-linkedin"><i class="fa fa-linkedin"></i></a>
                            <a href="#pablo" class="btn btn-just-icon btn-dribbble"><i class="fa fa-dribbble"></i></a>
                            <a href="#pablo" class="btn btbtn-pinterest"><i class="fa fa-pinterest"></i></a>
                        </div>
                    </div>
                </div>

                <div class="col-md-4 margin-bottom-30px">
                    <div class="card card-profile">
                        <div class="card-block">
                            <div class="card-avatar">
                                <a href="#avatar">
                                    <img src="http://d1j8r0kxyu9tj8.cloudfront.net/files/1508035613AfNXUWyphuCbQOZ.jpg"
                                         alt="...">
                                    <h4 class="card-title">Hương Phan</h4>
                                </a>
                            </div>
                            <p class="card-description text-center">
                            <h4><b>Hương Phan</b></h4><br>
                            Great teams do not hold back with one another. They are unafraid to air their dirty
                                laundry. They admit their mistakes, their weaknesses and their concerns without fear of
                                reprisal.
                            </p>
                        </div>
                        <div class="card-footer text-center">
                            <a href="#pablo" class="btn btn-just-icon btn-youtube"><i class="fa fa-youtube"></i></a>
                            <a href="#pablo" class="btn btn-just-icon btn-twitter"><i class="fa fa-twitter"></i></a>
                            <a href="#pablo" class="btn btn-just-icon btn-instagram"><i class="fa fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container" id="bookinfo2">
        <br><br>
        <div class="row">

            <div class="col-md-6">
                <div>
                    <div class="description">
                        <h1 class="big-title">
                            Tạp chí đồ hoạ <br> GRAPHHICS<br>
                        </h1>
                        <br><h5>ISSUE #02 - DRAW THE LINE</h5><br>

                        <p>Bất cứ ai khi học Tiếng Anh đều xuất phát từ những nhu cầu quan trọng trong cuộc sống. Với
                            cuốn sách Tiếng Anh Cơ Bản, Elight mong muốn người học sẽ có một chỗ dựa vững chắc và một
                            nền tảng kiến thức đủ tốt để biến ngôn ngữ Tiếng Anh trở thành công cụ mạnh nhất giúp bạn
                            tiến nhanh tới mọi mục tiêu mà bạn mong muốn !</p>
                        <br>
                        <button type="button" class="btn btn-outline-default btn-round">
                            <i class="fa fa-shopping-cart"></i>
                            Đặt mua ngay
                        </button>
                    </div>
                    <br>
                </div>

            </div>

            <div class="col-md-6">
                <div class="card card-profile card-plain">
                    <img class="card-img-top" src="/assets/img/mockup1.png">
                </div>

            </div>
        </div>

    </div>

@endsection
