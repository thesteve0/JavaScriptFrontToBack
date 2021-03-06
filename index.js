exports.HTML = ''+
+ '<html>'
+ '<style type="text/css">'
+ 'body {'
+ '    font-family: Arial, Helvetica;'
+ '    }'
+ '#outer {'
+ '    background-color:#aaa;'
+ '    position:absolute;'
+ '    top:0px;'
+ '    left:0px;'
+ '    height:100%;'
+ '    width:100%; '
+ '}'
+ ''
+ '#inner {'
+ '    position:relative;'
+ '    margin-left:auto;'
+ '    margin-right:auto;'
+ '    margin-top:10px;'
+ '    width:800px;'
+ '    height:500px;'
+ '    background-color:#eee;'
+ '    border:1px solid #666;'
+ '    box-shadow: .1em .1em .2em #666;'
+ '    padding-left:50px;'
+ '    padding-right:50px;'
+ '}'
+ '#inner h2 {'
+ ''
+ '    text-align:center;'
+ '}'
+ '#nameEntry, #addressEntry, #phoneEntry, #emailEntry {'
+ '    font-weight:bold;'
+ '    position:relative;'
+ '    left:50px;'
+ '    margin-top:30px;'
+ '}'
+ '#nameField, #addressField, #phoneField, #emailField {'
+ '    position:relative;'
+ '    left:100px;'
+ '    top:-20px;'
+ '    width:300px;'
+ '}'
+ '#listEntry{'
+ '    position:absolute;'
+ '    right:50px;'
+ '    top:90px;'
+ '    width:300px;'
+ '}'
+ '#addressList {'
+ '    background-color:white;'
+ '    width:300px;'
+ '    height:250px;'
+ '}'
+ '#saveEntry{'
+ '    position:absolute;'
+ '    bottom:50px;'
+ '    left:300px;'
+ '}'
+ '#saveButton,#deleteButton{'
+ '    width:100px;'
+ '}'
+ '#deleteEntry{'
+ '    position:absolute;'
+ '    bottom:50px;'
+ '    right:50px;'
+ '}'
+ '</style>'
+ '<head>'
+ '    <title>Granny\'s Addressbook</title>'
+ ''
+ '<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"> </script>'
+ ''
+ '</head>'
+ '<body>'
+ '<div id="outer">'
+ '<div id="inner">'
+ '<h2>'
+ '    Granny\'s Addressbook'
+ '</h2>'
+ ''
+ '<div id="content">'
+ '    <form id="addressForm" name="addressForm">'
+ '        <input id="selectedIndexField" name="selectedIndex" type="hidden" value=""/>'
+ '        <input id="oldNameField" name="oldName" type="hidden" value=""/>'
+ '        <div id="nameEntry">'
+ '            <div id="nameLabel" class="label">Name</div><input id="nameField" name="name" type="text" value=""/>'
+ '        </div>'
+ '        <div id="addressEntry">'
+ '            <div id="addressLabel" class="label">Address</div><input id="addressField" name="address" type="text" value=""/>'
+ '        </div>  '
+ '        <div id="phoneEntry">'
+ '            <div id="phoneLabel" class="label">Phone</div><input id="phoneField" name="phone" type="text" value=""/>'
+ '        </div>   '
+ '        <div id="emailEntry">'
+ '            <div id="emailLabel" class="label">Email</div><input id="emailField" name="email" type="text" value=""/>'
+ '        </div>'
+ '        <div id="saveEntry">'
+ '            <input id="saveButton" value="Save" type="button" onClick="app.saveAddress()"/>'
+ '        </div>  '
+ '        <div id="listEntry"> '
+ '            <div id="list">'
+ '                <select size="10" id="addressList" name="addressList">                  '
+ '                </select>'
+ '            </div>'
+ '        </div>'
+ '        <div id="deleteEntry">'
+ '            <input id="deleteButton" value="Delete" onClick="app.deleteAddress()" type="button"/>'
+ '        </div>  '
+ '    </form>'
+ ''
+ '</div><!-- end content-->'
+ '</div><!-- end inner -->'
+ '</div><!-- end outer -->'
+ '<script type="text/javascript">'
+ '//create an object to store our functions and variables\n\n'
+ '\n'
+ 'var app = {\n'
+ '     //populate the list box\n\n'
+ '    getAllAddresses: function () {\n'
+ '        $.getJSON("addresses", function(data){\n'
+ '             data = data.data;\n'
+ '            \n'
+ '            var entries = [];\n'
+ '            entries.push("<option value=\'\' />");\n'
+ '            $.each(data, function(){\n'
+ '                entries.push("<option name=\'\"+ this.name + \"\' value=\'\"+ this._id+\"\'>\"+ this.name +\"</option>");\n'
+ '            });\n'
+ '            \n'
+ '            $("#addressList").empty();\n'
+ '            $(entries.join("")).appendTo("#addressList");\n'
+ '        });\n'
+ '        \n'
+ '    },\n'
+ '     //save addresses\n\n'
+ '    saveAddress: function(){\n'
+ '        var address = app.makeAddress();\n'
+ '        if(address._id === "" || address._id.length <1) { app.createAddress(address); return;}\n'
+ '        $.ajax({\n'
+ '            url:"address",\n'
+ '            type:"post",\n'
+ '            contentType:"application/json",\n'
+ '            processData: false,\n'
+ '            data: JSON.stringify(address),\n'
+ '            success: function() { app.getAllAddresses(); }\n'
+ '        });\n'
+ '        \n'
+ '    },\n'
+ '    createAddress: function(address) {\n'
+ '          delete address._id;\n'
+ '          $.ajax({'
+ '                  url:"address",\n'
+ '                  type:"put",\n'
+ '                  contentType:"application/json",\n'
+ '                  processData: false,\n'
+ '                  data: JSON.stringify(address),\n'
+ '                  success: function() { app.getAllAddresses(); }\n'
+ '           });\n'
+ '    },\n'
+ '    makeAddress: function(){\n'
+ '        var addressObject = {\n'
+ '            name: $("#nameField").attr("value"),\n'
+ '            address: $("#addressField").attr("value"),\n'
+ '            phone: $("#phoneField").attr("value"),\n'
+ '            email: $("#emailField").attr("value"),\n'
+ '            _id: $("#selectedIndexField").attr("value")\n'
+ '        };\n'
+ '        return addressObject;\n'
+ '     }, \n'
+ '    emptyUser: {\n'
+ '            name: "",\n'
+ '            address: "",\n'
+ '            phone: "",\n'
+ '            email: ""\n'
+ '    },\n'
+ '    getAddressById: function (id){\n'
+ '        if(id){\n'
+ '             $.ajax({\n'
+ '                 url:"address/"+id,\n'
+ '                 type:"get",\n'
+ '                 success: function(data) { app.populateFields(data.data); }\n'
+ '             });\n'
+ '        }\n'
+ '        else{\n'
+ '            app.populateFields(app.emptyUser);\n'
+ '            \n'
+ '        }\n'
+ '    },\n'
+ '    \n'
+ '    populateFields: function(addressJSON){\n'
+ '        $("#nameField").attr("value", addressJSON.name);\n'
+ '        $("#addressField").attr("value", addressJSON.address);\n'
+ '        $("#phoneField").attr("value", addressJSON.phone);\n'
+ '        $("#emailField").attr("value", addressJSON.email);\n'
+ '        $("#selectedIndexField").val(addressJSON._id || "");\n'
+ '    },\n'
+ '    \n'
+ '    deleteAddress: function(){\n'
+ '        var address = app.makeAddress();\n'
+ '        var currentName = $("#nameField").attr("value");\n'
+ '        $.ajax({\n'
+ '            url:"address/name/"+currentName,\n'
+ '            type:"delete",\n'
+ '            data: JSON.stringify(address),\n'
+ '            success: function() {\n'
+ '                app.getAllAddresses();\n'
+ '                app.populateFields(app.emptyUser);\n'
+ '            }\n'
+ '        });\n'
+ '    }\n'
+ '\n'
+ '\n'
+ '};\n'
+ '\n'
+ '//after the page loads\n\n'
+ '$(function () {\n'
+ '    app.getAllAddresses()\n'
+ '    $("#addressList").on("click","option", function(){\n app.getAddressById(this.value);\n });\n'
+ '});\n'
+ '</script>'
+ '</body>'
+ '</html>';
