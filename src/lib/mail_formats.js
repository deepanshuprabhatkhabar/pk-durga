const formats = {
    
    contact: {
        text: function(data) {
            var html = "";
            html += `<body>
            <table  align="center" width="600" border="0" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border:1px solid #e6e6e6;" >

            <tr>
            
                <td width="150" align="left" valign="middle" height="40" style=" padding:23px 0px 15px 39px; border-bottom:1px solid #e6e6e6;">
            
                <font style="font-family:Arial, Helvetica, sans-serif; font-size:13px; font-weight:bold; color:#1b1b1b">Name</font>
            
                </td>
            
                <td height="40" align="left" valign="middle" style=" border-bottom:1px solid #e6e6e6; padding:23px 0px 15px 0px;">
            
                <font style="font-family:Arial, Helvetica, sans-serif; font-size:13px; color:#1b1b1b">${data.name}</font>
            
                </td>
            
            </tr>
             
             <tr>
            
                <td width="150" align="left" valign="middle" height="40" style="padding-left:39px; border-bottom:1px solid #e6e6e6;">
            
                <font style="font-family:Arial, Helvetica, sans-serif; font-size:13px; font-weight:bold; color:#1b1b1b;">Email</font>
            
                </td>
            
                <td height="40" align="left" valign="middle"  style="border-bottom:1px solid #e6e6e6;"><font style="font-family:Arial, Helvetica, sans-serif; font-size:13px;">
            
                <a href="mailto:'.$email.'" style="color:#ca2d32; text-decoration:none;">${data.email}</a></font>
            
                </td>
            
            </tr>
            
            <tr>
            
                <td width="150" align="left" valign="middle" height="40" style=" padding:23px 0px 15px 39px; border-bottom:1px solid #e6e6e6;">
            
                <font style="font-family:Arial, Helvetica, sans-serif; font-size:13px; font-weight:bold; color:#1b1b1b">Contact No.</font>
            
                </td>
            
                <td height="40" align="left" valign="middle" style=" border-bottom:1px solid #e6e6e6; padding:23px 0px 15px 0px;">
            
                <font style="font-family:Arial, Helvetica, sans-serif; font-size:13px; color:#1b1b1b">${data.phone}</font>
            
                </td>
            
            </tr>
            
            
            
            </table>
           </body> `;

           return (html);
        },

        subject: "Cargo Flash Enquiry"
    },
    productEnquiry: {
        text: function(data) {
            var html = "";
            html += `<body>
            <table  align="center" width="600" border="0" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border:1px solid #e6e6e6;" >
            <tr>
            
            <td width="150" align="left" valign="middle" height="40" style=" padding:23px 0px 15px 39px; border-bottom:1px solid #e6e6e6;">
        
            <font style="font-family:Arial, Helvetica, sans-serif; font-size:13px; font-weight:bold; color:#1b1b1b">Product Name</font>
        
            </td>
        
            <td height="40" align="left" valign="middle" style=" border-bottom:1px solid #e6e6e6; padding:23px 0px 15px 0px;">
        
            <font style="font-family:Arial, Helvetica, sans-serif; font-size:13px; color:#1b1b1b">${data.productFullName}</font>
        
            </td>
        
        </tr>
             
             <tr>
            
                <td width="150" align="left" valign="middle" height="40" style="padding-left:39px; border-bottom:1px solid #e6e6e6;">
            
                <font style="font-family:Arial, Helvetica, sans-serif; font-size:13px; font-weight:bold; color:#1b1b1b;">Email</font>
            
                </td>
            
                <td height="40" align="left" valign="middle"  style="border-bottom:1px solid #e6e6e6;"><font style="font-family:Arial, Helvetica, sans-serif; font-size:13px;">
            
                <a href="mailto:'.$email.'" style="color:#ca2d32; text-decoration:none;">${data.email}</a></font>
            
                </td>
            
            </tr>
            
            <tr>
            
                <td width="150" align="left" valign="middle" height="40" style=" padding:23px 0px 15px 39px; border-bottom:1px solid #e6e6e6;">
            
                <font style="font-family:Arial, Helvetica, sans-serif; font-size:13px; font-weight:bold; color:#1b1b1b">Institute</font>
            
                </td>
            
                <td height="40" align="left" valign="middle" style=" border-bottom:1px solid #e6e6e6; padding:23px 0px 15px 0px;">
            
                <font style="font-family:Arial, Helvetica, sans-serif; font-size:13px; color:#1b1b1b">${data.institute}</font>
            
                </td>
            
            </tr>
            
            
            
            </table>
           </body> `;

           return (html);
        },

        subject: "Cargo Flash Product Enquiry"
    },
    contactdetails: {
        text: function(data) {
            var html = "";
            html += `<body>
            <table  align="center" width="600" border="0" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border:1px solid #e6e6e6;" >
            <tr>
            
            <td width="150" align="left" valign="middle" height="40" style=" padding:23px 0px 15px 39px; border-bottom:1px solid #e6e6e6;">
        
            <font style="font-family:Arial, Helvetica, sans-serif; font-size:13px; font-weight:bold; color:#1b1b1b">Product Name</font>
        
            </td>
        
            <td height="40" align="left" valign="middle" style=" border-bottom:1px solid #e6e6e6; padding:23px 0px 15px 0px;">
        
            <font style="font-family:Arial, Helvetica, sans-serif; font-size:13px; color:#1b1b1b">${data.message}</font>
        
            </td>
        
        </tr>
        <tr>
            
        <td width="150" align="left" valign="middle" height="40" style=" padding:23px 0px 15px 39px; border-bottom:1px solid #e6e6e6;">
    
        <font style="font-family:Arial, Helvetica, sans-serif; font-size:13px; font-weight:bold; color:#1b1b1b">Product Name</font>
    
        </td>
    
        <td height="40" align="left" valign="middle" style=" border-bottom:1px solid #e6e6e6; padding:23px 0px 15px 0px;">
    
        <font style="font-family:Arial, Helvetica, sans-serif; font-size:13px; color:#1b1b1b">${data.department}</font>
    
        </td>
    
    </tr>
            <tr>
            
                <td width="150" align="left" valign="middle" height="40" style=" padding:23px 0px 15px 39px; border-bottom:1px solid #e6e6e6;">
            
                <font style="font-family:Arial, Helvetica, sans-serif; font-size:13px; font-weight:bold; color:#1b1b1b">Name</font>
            
                </td>
            
                <td height="40" align="left" valign="middle" style=" border-bottom:1px solid #e6e6e6; padding:23px 0px 15px 0px;">
            
                <font style="font-family:Arial, Helvetica, sans-serif; font-size:13px; color:#1b1b1b">${data.name}</font>
            
                </td>
            
            </tr>
             
             <tr>
            
                <td width="150" align="left" valign="middle" height="40" style="padding-left:39px; border-bottom:1px solid #e6e6e6;">
            
                <font style="font-family:Arial, Helvetica, sans-serif; font-size:13px; font-weight:bold; color:#1b1b1b;">Email</font>
            
                </td>
            
                <td height="40" align="left" valign="middle"  style="border-bottom:1px solid #e6e6e6;"><font style="font-family:Arial, Helvetica, sans-serif; font-size:13px;">
            
                <a href="mailto:'.$email.'" style="color:#ca2d32; text-decoration:none;">${data.email}</a></font>
            
                </td>
            
            </tr>
            
            <tr>
            
                <td width="150" align="left" valign="middle" height="40" style=" padding:23px 0px 15px 39px; border-bottom:1px solid #e6e6e6;">
            
                <font style="font-family:Arial, Helvetica, sans-serif; font-size:13px; font-weight:bold; color:#1b1b1b">Contact No.</font>
            
                </td>
            
                <td height="40" align="left" valign="middle" style=" border-bottom:1px solid #e6e6e6; padding:23px 0px 15px 0px;">
            
                <font style="font-family:Arial, Helvetica, sans-serif; font-size:13px; color:#1b1b1b">${data.phone}</font>
            
                </td>
            
            </tr>
          
            
            </table>
           </body> `;

           return (html);
        },

        subject: "Cargo Flash Contact Details Enquiry"
    },
    productDemoEnquiry: {
        text: function(data) {
            var html = "";
            html += `<body>
            <table  align="center" width="600" border="0" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border:1px solid #e6e6e6;" >
            <tr>
            
            <td width="150" align="left" valign="middle" height="40" style=" padding:23px 0px 15px 39px; border-bottom:1px solid #e6e6e6;">
        
            <font style="font-family:Arial, Helvetica, sans-serif; font-size:13px; font-weight:bold; color:#1b1b1b">Product Name</font>
        
            </td>
        
            <td height="40" align="left" valign="middle" style=" border-bottom:1px solid #e6e6e6; padding:23px 0px 15px 0px;">
        
            <font style="font-family:Arial, Helvetica, sans-serif; font-size:13px; color:#1b1b1b">${data.productFullName}</font>
        
            </td>
        
        </tr>
            <tr>
            
                <td width="150" align="left" valign="middle" height="40" style=" padding:23px 0px 15px 39px; border-bottom:1px solid #e6e6e6;">
            
                <font style="font-family:Arial, Helvetica, sans-serif; font-size:13px; font-weight:bold; color:#1b1b1b">Name</font>
            
                </td>
            
                <td height="40" align="left" valign="middle" style=" border-bottom:1px solid #e6e6e6; padding:23px 0px 15px 0px;">
            
                <font style="font-family:Arial, Helvetica, sans-serif; font-size:13px; color:#1b1b1b">${data.name}</font>
            
                </td>
            
            </tr>
             
             <tr>
            
                <td width="150" align="left" valign="middle" height="40" style="padding-left:39px; border-bottom:1px solid #e6e6e6;">
            
                <font style="font-family:Arial, Helvetica, sans-serif; font-size:13px; font-weight:bold; color:#1b1b1b;">Email</font>
            
                </td>
            
                <td height="40" align="left" valign="middle"  style="border-bottom:1px solid #e6e6e6;"><font style="font-family:Arial, Helvetica, sans-serif; font-size:13px;">
            
                <a href="mailto:'.$email.'" style="color:#ca2d32; text-decoration:none;">${data.email}</a></font>
            
                </td>
            
            </tr>
            
            <tr>
            
                <td width="150" align="left" valign="middle" height="40" style=" padding:23px 0px 15px 39px; border-bottom:1px solid #e6e6e6;">
            
                <font style="font-family:Arial, Helvetica, sans-serif; font-size:13px; font-weight:bold; color:#1b1b1b">Contact No.</font>
            
                </td>
            
                <td height="40" align="left" valign="middle" style=" border-bottom:1px solid #e6e6e6; padding:23px 0px 15px 0px;">
            
                <font style="font-family:Arial, Helvetica, sans-serif; font-size:13px; color:#1b1b1b">${data.phone}</font>
            
                </td>
            
            </tr>
            
            <tr>
            
            <td width="150" align="left" valign="middle" height="40" style=" padding:23px 0px 15px 39px; border-bottom:1px solid #e6e6e6;">
        
            <font style="font-family:Arial, Helvetica, sans-serif; font-size:13px; font-weight:bold; color:#1b1b1b">Message</font>
        
            </td>
        
            <td height="40" align="left" valign="middle" style=" border-bottom:1px solid #e6e6e6; padding:23px 0px 15px 0px;">
        
            <font style="font-family:Arial, Helvetica, sans-serif; font-size:13px; color:#1b1b1b">${data.message}</font>
        
            </td>
        
        </tr>
            
            
            </table>
           </body> `;

           return (html);
        },

        subject: "Cargo Flash Product Demo Enquiry"
    },
 
    newsletteremail: {
        text: function(data) {
            var html = "";
            html += `<body>
            <table  align="center" width="600" border="0" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border:1px solid #e6e6e6;" >
            <tr>
            
            <td width="150" align="left" valign="middle" height="40" style=" padding:23px 0px 15px 39px; border-bottom:1px solid #e6e6e6;">
        
            <font style="font-family:Arial, Helvetica, sans-serif; font-size:13px; font-weight:bold; color:#1b1b1b">Thanks</font>
        
            </td>
        
            <td height="40" align="left" valign="middle" style=" border-bottom:1px solid #e6e6e6; padding:23px 0px 15px 0px;">
        
            <font style="font-family:Arial, Helvetica, sans-serif; font-size:13px; color:#1b1b1b">Thankyou for subscribing news letter  </font>
        
            </td>
        
        </tr>
            
            </table>
           </body> `;

           return (html);
        },

        subject: "Cargo Flash Product Demo Enquiry"
    },

    trendsUtasv: function(data) {
        var html = "";
        html += `<body>
        <table  align="center" width="600" border="0" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border:1px solid #e6e6e6;" >

        <tr>
        
            <td width="150" align="left" valign="middle" height="40" style=" padding:23px 0px 15px 39px; border-bottom:1px solid #e6e6e6;">
        
            <font style="font-family:Arial, Helvetica, sans-serif; font-size:13px; font-weight:bold; color:#1b1b1b">Name</font>
        
            </td>
        
            <td height="40" align="left" valign="middle" style=" border-bottom:1px solid #e6e6e6; padding:23px 0px 15px 0px;">
        
            <font style="font-family:Arial, Helvetica, sans-serif; font-size:13px; color:#1b1b1b">${data.name}</font>
        
            </td>
        
        </tr>
         
         <tr>
        
            <td width="150" align="left" valign="middle" height="40" style="padding-left:39px; border-bottom:1px solid #e6e6e6;">
        
            <font style="font-family:Arial, Helvetica, sans-serif; font-size:13px; font-weight:bold; color:#1b1b1b;">Email</font>
        
            </td>
        
            <td height="40" align="left" valign="middle"  style="border-bottom:1px solid #e6e6e6;"><font style="font-family:Arial, Helvetica, sans-serif; font-size:13px;">
        
            <a href="mailto:'.$email.'" style="color:#ca2d32; text-decoration:none;">${data.email}</a></font>
        
            </td>
        
        </tr>
        
        <tr>
        
            <td width="150" align="left" valign="middle" height="40" style=" padding:23px 0px 15px 39px; border-bottom:1px solid #e6e6e6;">
        
            <font style="font-family:Arial, Helvetica, sans-serif; font-size:13px; font-weight:bold; color:#1b1b1b">Contact No.</font>
        
            </td>
        
            <td height="40" align="left" valign="middle" style=" border-bottom:1px solid #e6e6e6; padding:23px 0px 15px 0px;">
        
            <font style="font-family:Arial, Helvetica, sans-serif; font-size:13px; color:#1b1b1b">${data.phone}</font>
        
            </td>
        
        </tr>`

        html +=`<tr>
        
        <td width="150" align="left" valign="middle" height="40" style=" padding:23px 0px 15px 39px; border-bottom:1px solid #e6e6e6;">
    
        <font style="font-family:Arial, Helvetica, sans-serif; font-size:13px; font-weight:bold; color:#1b1b1b">Age</font>
    
        </td>
    
        <td height="40" align="left" valign="middle" style=" border-bottom:1px solid #e6e6e6; padding:23px 0px 15px 0px;">
    
        <font style="font-family:Arial, Helvetica, sans-serif; font-size:13px; color:#1b1b1b">${data.age}</font>
    
        </td>
    
    </tr>`

    html +=`<tr>
        
    <td width="150" align="left" valign="middle" height="40" style=" padding:23px 0px 15px 39px; border-bottom:1px solid #e6e6e6;">

    <font style="font-family:Arial, Helvetica, sans-serif; font-size:13px; font-weight:bold; color:#1b1b1b">City</font>

    </td>

    <td height="40" align="left" valign="middle" style=" border-bottom:1px solid #e6e6e6; padding:23px 0px 15px 0px;">

    <font style="font-family:Arial, Helvetica, sans-serif; font-size:13px; color:#1b1b1b">${data.city},${data.pincode}</font>

    </td>

</tr>`


html +=`<tr>
        
    <td width="150" align="left" valign="middle" height="40" style=" padding:23px 0px 15px 39px; border-bottom:1px solid #e6e6e6;">

    <font style="font-family:Arial, Helvetica, sans-serif; font-size:13px; font-weight:bold; color:#1b1b1b">Gender</font>

    </td>

    <td height="40" align="left" valign="middle" style=" border-bottom:1px solid #e6e6e6; padding:23px 0px 15px 0px;">

    <font style="font-family:Arial, Helvetica, sans-serif; font-size:13px; color:#1b1b1b">${data.gender}</font>

    </td>

</tr>`
        

        
        
        html+=`</table>
       </body> `;

       return (html);
    },
    
}
 
module.exports = formats