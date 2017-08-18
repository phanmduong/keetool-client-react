<!DOCTYPE html>
<html>
<head>
    <title>ColorMe</title>
    
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <style type="text/css">
        /* CLIENT-SPECIFIC STYLES */
        body, table, td, a {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        
        /* Prevent WebKit and Windows mobile changing default text sizes */
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        
        /* Remove spacing between tables in Outlook 2007 and up */
        img {
            -ms-interpolation-mode: bicubic;
        }
        
        /* Allow smoother rendering of resized image in Internet Explorer */
        
        /* RESET STYLES */
        img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }
        
        table {
            border-collapse: collapse !important;
        }
        
        body {
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
        }
        
        /* iOS BLUE LINKS */
        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }
        
        /* MOBILE STYLES */
        @media screen and (max-width: 525px) {
            
            /* ALLOWS FOR FLUID TABLES */
            .wrapper {
                width: 100% !important;
                max-width: 100% !important;
            }
            
            /* ADJUSTS LAYOUT OF LOGO IMAGE */
            .logo img {
                margin: 0 auto !important;
            }
            
            /* USE THESE CLASSES TO HIDE CONTENT ON MOBILE */
            .mobile-hide {
                display: none !important;
            }
            
            .img-max {
                max-width: 100% !important;
                width: 100% !important;
                height: auto !important;
            }
            
            /* FULL-WIDTH TABLES */
            .responsive-table {
                width: 100% !important;
            }
            
            /* UTILITY CLASSES FOR ADJUSTING PADDING ON MOBILE */
            .padding {
                padding: 10px 5% 15px 5% !important;
            }
            
            .padding-meta {
                padding: 30px 5% 0px 5% !important;
                text-align: center;
            }
            
            .padding-copy {
                padding: 10px 5% 10px 5% !important;
                text-align: center;
            }
            
            .no-padding {
                padding: 0 !important;
            }
            
            .section-padding {
                padding: 50px 15px 50px 15px !important;
            }
            
            /* ADJUST BUTTONS ON MOBILE */
            .mobile-button-container {
                margin: 0 auto;
                width: 100% !important;
            }
            
            .mobile-button {
                padding: 15px !important;
                border: 0 !important;
                font-size: 16px !important;
                display: block !important;
            }
            
        }
        
        /* ANDROID CENTER FIX */
        div[style*="margin: 16px 0;"] {
            margin: 0 !important;
        }
    </style>
</head>
<body style="margin: 0 !important; padding: 0 !important;">

<!-- HIDDEN PREHEADER TEXT -->
<div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    Chào mừng bạn đến với colorME
</div>

<!-- HEADER -->
<table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
        <td bgcolor="#ffffff" align="center">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="500">
                <tr>
                    <td align="center" valign="top" width="500">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;" class="wrapper">
                <tr>
                    <td align="center" valign="top" style="padding: 15px 0;" class="logo">
                        <a href="http://colorme.vn" target="_blank">
                            <img alt="Logo"
                                 src="https://s3-ap-southeast-1.amazonaws.com/cmstorage/12006581_965968973471128_6084208262051465701_o.jpg"
                                 width="60" height="60"
                                 style="display: block; font-family: Helvetica, Arial, sans-serif; color: #ffffff; font-size: 16px;"
                                 border="0">
                        </a>
                    </td>
                </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
    <tr>
        <td bgcolor="#ffffff" align="center" style="padding: 15px;">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="500">
                <tr>
                    <td align="center" valign="top" width="500">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;"
                   class="responsive-table">
                <tr>
                    <td>
                        <!-- COPY -->
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td align="center"
                                    style="font-size: 32px; font-family: Helvetica, Arial, sans-serif; color: #333333; padding-top: 30px;"
                                    class="padding-copy">[ColorME] Lời chào tạm biệt từ ColorME
                                </td>
                            </tr>
                            <tr>
                                <td align="left"
                                    style="padding: 20px 0 0 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;">{{$student->name}}
                                    thân mến,
                                </td>
                            </tr>
                            <tr>
                                <td align="left"
                                    style="text-align:center;padding: 20px 0 0 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;"
                                    class="padding-copy">
                                    <p>
                                        Cảm ơn bạn đã gắn bó với gia đình ColorME trong suốt thời gian vừa qua. Dù
                                        chỉ {{$class->course->duration}} buổi
                                        ngắn ngủi nhưng ColorME hi
                                        vọng các bạn đã gặt hái được những những kiến thức căn bản nhất của thiết kế.
                                    </p>
                                
                                </td>
                            </tr>
                        
                        </table>
                    </td>
                </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
    <tr>
        <td bgcolor="#ffffff" align="center" style="padding: 15px;">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="500">
                <tr>
                    <td align="center" valign="top" width="500">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;"
                   class="responsive-table">
                <tr>
                    <td>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td>
                                    <!-- COPY -->
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td align="left"
                                                style="padding: 0 0 0 0; font-size: 14px; line-height: 18px; font-family: Helvetica, Arial, sans-serif; color: #aaaaaa; font-style: italic;"
                                                class="padding-copy"></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
    <tr>
        <td bgcolor="#ffffff" align="center" style="padding: 15px;">
            <table border="0" cellpadding="0" cellspacing="0" width="500" class="responsive-table">
                <tr>
                    <td>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <!-- COPY -->
                                <td align="center"
                                    style="font-size: 20px;font-family: Helvetica, Arial, sans-serif; color: #333333; padding-top: 30px;"
                                    class="padding-copy">Nếu có bất kì ý kiến góp ý hay thắc mắc, liên hệ bọn mình bất
                                    cứ lúc nào nhé, chúng mình sẽ cố gắng trả lời bạn trong thời gian sớm nhất.
                                </td>
                            </tr>
                            <tr>
                                <td align="left"
                                    style="padding: 20px 0 0 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;"
                                    class="padding-copy">
                                    <ul>
                                        <li><b>Hotline</b>: 0168.967.8262 (Gặp Nhi)</li>
                                        <li><b>Website</b>: http://colorme.vn/</li>
                                        <li><b>Fanpage</b>: https://www.facebook.com/ColorME.Hanoi</li>
                                        <li><b>Email</b>: colorme.idea@gmail.com</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td align="left"
                                    style="padding: 20px 0 0 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;"
                                    class="padding-copy">
                                    <p>
                                        Cùng tham gia cộng đồng mạng ColorME để tìm kiếm cơ hội việc làm thiết kế, hay
                                        sưu tầm thêm những tài liệu bổ ích về
                                        thiết kế được chia sẻ tại:
                                        <a href="https://www.facebook.com/groups/CANME/">https://www.facebook.com/groups/CANME/</a>
                                    </p>
                                    <p>
                                        Một lần ColorME, mãi mãi ColorME
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td align="center">
                                    <!-- BULLETPROOF BUTTON -->
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td align="center" style="padding-top: 25px;" class="padding">
                                                <table border="0" cellspacing="0" cellpadding="0"
                                                       class="mobile-button-container">
                                                    <tr>
                                                        <td>
                                                            <a href="http://colorme.vn/classes/1">
                                                                <img style="width:100%"
                                                                     src="https://s3-ap-southeast-1.amazonaws.com/cmstorage/webs/1458318028a885YhKaEd3tkJ1.jpg"/>
                                                            </a>
                                                        </td>
                                                        <td>
                                                            <a href="http://colorme.vn/classes/4">
                                                                <img style="width:100%"
                                                                     src="https://s3-ap-southeast-1.amazonaws.com/cmstorage/webs/1468283993aAUV4FaUmgSA9Xn.jpg"/>
                                                            </a>
                                                        </td>
                                                        <td>
                                                            <a href="http://colorme.vn/classes/2">
                                                                <img style="width:100%"
                                                                     src="https://s3-ap-southeast-1.amazonaws.com/cmstorage/webs/1457423925Qhozom9GiZZGLLS.jpg"/>
                                                            </a>
                                                        </td>
                                                        <td>
                                                            <a href="http://colorme.vn/classes/3">
                                                                <img style="width:100%"
                                                                     src="https://s3-ap-southeast-1.amazonaws.com/cmstorage/webs/14574242586UOgi4tWQVwuzO1.jpg"/>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
    <tr>
        <td bgcolor="#ffffff" align="center" style="padding: 20px 0px;">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="500">
                <tr>
                    <td align="center" valign="top" width="500">
            <![endif]-->
            <!-- UNSUBSCRIBE COPY -->
            <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" style="max-width: 500px;"
                   class="responsive-table">
                <tr>
                    <td align="center"
                        style="font-size: 12px; line-height: 18px; font-family: Helvetica, Arial, sans-serif; color:#666666;">
                        175 Chùa Láng, Hà Nội
                    </td>
                </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
</table>

</body>
</html>
