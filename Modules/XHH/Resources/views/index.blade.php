@extends('xhh::layouts.master')

@section('content')
    <div class="container" id="bookinfo">
        <div class="row" style="margin-top:7%">
            <div class="col-md-12">
                <div style="background-image: url('http://d1j8r0kxyu9tj8.cloudfront.net/files/15132416649MjXr1VTKC53cHy.png');background-size: cover;">
                    <div style="padding-top:15%">
                        <div style="background: -webkit-linear-gradient(top, rgba(0,0,0,0) 0%,rgba(0,0,0,0.7) 100%); padding:2%; padding-top:30px">
                            <h3 style="margin:0;padding:0;color:white; font-weight: 400">Chào mừng bạn<br>
                                đến với khoa Xã Hội Học<br>
                                Trường Đại Học Khoa Học Huế!
                            </h3>

                            <p style="color:white">
                                Cùng chúng tôi cập nhật các thông tin mới nhất từ khoa
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <h3>
                    <b>Bài viết mới nhất</b>
                </h3>
                <a href="/blog" style="color:#c50000!important"><b>Xem thêm</b></a>
                <br><br>
            </div>
            <div class="col-md-6">
                <div class="card card-plain card-blog">
                    <div class="card-image">
                        <a href="/blog/post/{{$newestBlog->id}}">
                            <div style="width: 100%;
                                    border-radius: 2px;
                                    background: url({{generate_protocol_url($newestBlog->url)}});
                                    background-size: cover;
                                    background-position: center;
                                    padding-bottom: 70%;"></div>
                        </a>
                    </div>
                    <div class="card-block">
                        <p style="margin-top:15px"><b>{{$newestBlog->title}}</b></p>
                        <p class="card-description">
                            {{$newestBlog->description}}
                        </p>
                        <a href="/blog/post/{{$newestBlog->id}}" style="color:#c50000!important"><b>Xem thêm</b></a>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                @foreach($newestTop3 as $blog)
                    <div class="card card-plain card-blog" style="margin-bottom: 0px">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="card-image">
                                    <a href="/blog/post/{{$blog->id}}">
                                        <div style="width: 100%;
                                                border-radius: 2px;
                                                background: url({{generate_protocol_url($blog->url)}});
                                                background-size: cover;
                                                background-position: center;
                                                padding-bottom: 70%;"></div>
                                    </a>
                                </div>
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <p style="margin-top:15px"><b>{{$blog->title}}</b></p>
                                    <p class="card-description">
                                        {{$blog->description}}
                                        <a href="/blog/post/{{$blog->id}}" style="color:#c50000!important"><br><b>Xem
                                                thêm</b></a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div style="background-image: url('http://d1j8r0kxyu9tj8.cloudfront.net/files/1513315148lid7m57PXMpi8ig.png');background-size: cover;">
                            <div style="padding-top:15%">
                                <div style="background: -webkit-linear-gradient(top, rgba(0,0,0,0) 0%,rgba(0,0,0,0.7) 100%); padding:2%; padding-top:30px">
                                    <h3 style="margin:0;padding:0;color:white; font-weight: 400">Chào mừng bạn<br>
                                        đến với khoa Xã Hội Học<br>
                                        Trường Đại Học Khoa Học Huế!
                                    </h3>

                                    <p style="color:white">
                                        Cùng chúng tôi cập nhật các thông tin mới nhất từ khoa
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h3>
                            <b>Hoạt động đoàn thể</b>
                        </h3>
                        <a href="/blog/post/14676" style="color:#c50000!important"><b>Xem thêm</b></a>

                        <br><br>
                    </div>
                    @foreach($blogSection1 as $blog)
                        <div class="col-md-12">
                            <div class="card card-plain card-blog">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="card-image">
                                            <a href="/blog/post/{{$blog->id}}">
                                                <div style="width: 100%;
                                                        border-radius: 2px;
                                                        background: url('{{generate_protocol_url($blog->url)}}');
                                                        background-size: cover;
                                                        background-position: center;
                                                        padding-bottom: 70%;"></div>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h6 class="card-category">{{$blog->author->name}}</h6>
                                            <h3 class="card-title">
                                                <a href="#pablo">{{$blog->title}}</a>
                                            </h3>
                                            <p class="card-description">
                                                {{$blog->description}}
                                            </p>
                                            <a href="/blog/post/{{$blog->id}}" style="color:#c50000!important"><br><b>Xem
                                                    thêm</b></a>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
            <br>
            <div style="height:1px; margin-bottom:9px; background:#c2c2c2">

            </div>
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h3>
                            <b>Nghiên cứu khoa học</b>
                        </h3>
                        <a href="/blog/post/14676" style="color:#c50000!important"><b>Xem thêm</b></a>

                        <br><br>
                    </div>
                    @foreach($blogSection2 as $blog)
                        <div class="col-md-4">
                            <div class="card card-plain card-blog text-center">
                                <div class="card-image">
                                    <a href="/blog/post/14676">
                                        <div style="width: 100%;
                                                border-radius: 2px;
                                                background: url('{{generate_protocol_url($blog->url)}}');
                                                background-size: cover;
                                                background-position: center;
                                                padding-bottom: 70%;"></div>
                                    </a>
                                </div>
                                <div class="card-body">
                                    <h6 class="card-category text-danger">{{$blog->author->name}}</h6>
                                    <h3 class="card-title">
                                        <a href="#pablo">{{$blog->title}}</a>
                                    </h3>
                                    <p class="card-description">
                                        {{$blog->description}}
                                    </p>
                                    <br>
                                    <a href="/blog/post/{{$blog->id}}" class="btn btn-google btn-round"> Đọc thêm</a>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
            <br>
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div style="background-image: url('http://d1j8r0kxyu9tj8.cloudfront.net/files/1513315147hlROAAiDKpgLRmg.png');background-size: cover;">
                            <div style="padding-top:15%">
                                <div style="background: -webkit-linear-gradient(top, rgba(0,0,0,0) 0%,rgba(0,0,0,0.7) 100%); padding:2%; padding-top:30px">
                                    <h3 style="margin:0;padding:0;color:white; font-weight: 400">Chào mừng bạn<br>
                                        đến với khoa Xã Hội Học<br>
                                        Trường Đại Học Khoa Học Huế!
                                    </h3>

                                    <p style="color:white">
                                        Cùng chúng tôi cập nhật các thông tin mới nhất từ khoa
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <div id="vuejs1" class="row">
                    @foreach($books as $book)
                        <div class="col-md-3">
                            <div class="card card-profile" style="border-radius: 0px;">
                                <div style="padding: 3%;">
                                    <div style="background-image: url('{{$book->avatar_url}}'); background-size: cover; padding-bottom: 120%; width: 100%; background-position: center center;"></div>
                                </div>
                                <div>
                                    <div class="container text-left" style="min-height: 130px;"><br>
                                        <p style="font-weight: 600;">{{$book->name}}</p>
                                        <p>{{$book->description}}</p></div>
                                </div>
                                <div class="card-footer" style="border-top: 1px solid rgb(220, 219, 219) !important;">
                                    <div style="text-align: right;">
                                        <a class="btn btn-google" style="margin: 3px; font-size: 10px;"
                                           href="/book/{{$book->id}}">
                                            Tải xuống<i class="fa fa-download"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
            <br><br>
        </div>
    </div>
@endsection