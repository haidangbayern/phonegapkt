/** ================ Environment ================== **/
window.is_dev = false;
window.is_use_uuid = false;
window.is_use_payment = true;
window.has_virtual_keyboard = true;
window.keyboard_disableScroll = true;
window.debug = false;
/** ================ Server Information ================== **/
window.server_ip = "demo.games4fun.abcv.com"; //demo server

window.server_ip_list = [
    { name: "Select Server", ip: "-1" },
    { name: "Huy.Tran", ip: "ABC-VN-14" },
    { name: "Tram.Nguyen", ip: "bichtram.kootoro.com" },
    { name: "Nguyen.Ly", ip: "192.168.3.43" },
    { name: "Anh.Luu", ip: "192.168.3.64" },
    { name: "Demo.kootoro", ip: "demo.games4fun.abcv.com"},
];

window.server_post = "8000";
window.server_url = "http://" + window.server_ip + ":80";
window.is_device = window.cordova;
/** ================ Application Information ================== **/
window.version = 2;
window.version_application = "2.0.219";	//It will be updated by config.xml
/** ================ Database ================== **/
window.database = {
    name: '_abcv_kootoro_app',
    version: '1',
    displayname: 'kootoro_db',
    size: '200000',
};
/** ================ Location ================== **/
window.US = 184;
window.CA = 31;
window.US_ISO2 = "US";
window.CA_ISO2 = "CA";
/** ================ Device ================== **/
if (typeof device == "undefined") {
    device = {
        model: "laptop",
        cordova: "3.5.0",
        uuid: "ABC-VN-14",
        version: "window8",
        name: "ABCV-VN-14",
        platform: "Android",
    };
}
else
{
    window.has_virtual_keyboard = false;
}
/** ================ Data To test ================== **/
window.dev_data = {
    "ABC-VN-14" :
    {
        "user" : {
            email : "tranhanhuy@gmail.com",
            password : "p@ssw0rd",
        },
        "new_cc" : {
            card_number: "4111111111111111",
            cvv: "111",
            exp_date: "2015-11",
            address_1: "1400 N. W. 65th Place Fort Lauderdale, FL 33309",
            zip_code: "33309",
            city: "Fort Lauderdale",
            phone_1: "954",
            phone_2: "9177592",
            phone_3: "3009",
        },
        "shipping_info"  : {
            first_name : "tran" ,
            last_name : "freb",
            address_1 : "123 abc",
            address_2 : null,
            zip_code : 'fjd21',
            city : 'hcm',
            phone_1 : '826',
            phone_2 : '1234345',
            phone_3 : '1235',
        },
    },
    "bichtram.kootoro.com" :
    {
        "user" : {
            email : "hongnguyen110185@yahoo.com.vn",
            password : "p@ssw0rd",
        },
        "new_cc" : {
            card_number: "4111111111111111",
            cvv: "111",
            exp_date: "2015-11",
            address_1: "1400 N. W. 65th Place Fort Lauderdale, FL 33309",
            zip_code: "33309",
            city: "Fort Lauderdale",
            phone_1: "954",
            phone_2: "9177592",
            phone_3: "3009",
        },
        "shipping_info"  : {
            first_name : "hong" ,
            last_name : "nguyen",
            address_1 : "123 abc",
            address_2 : null,
            zip_code : 'fjd21',
            city : 'hcm',
            phone_1 : '826',
            phone_2 : '1234345',
            phone_3 : '1235',
        },
    },
    "192.168.3.43" :
    {
        "user" : {
            email : "nguyenuit@gmail.com",
            password : "123456",
        },
        "new_cc" : {
            card_number: "4111111111111111",
            cvv: "111",
            exp_date: "2015-11",
            address_1: "1400 N. W. 65th Place Fort Lauderdale, FL 33309",
            zip_code: "33309",
            city: "Fort Lauderdale",
            phone_1: "954",
            phone_2: "9177592",
            phone_3: "3009",
        },
        "shipping_info"  : {
            first_name : "nguyen" ,
            last_name : "thai",
            address_1 : "123 abc",
            address_2 : null,
            zip_code : 'fjd21',
            city : 'hcm',
            phone_1 : '826',
            phone_2 : '1234345',
            phone_3 : '1235',
        },
    },
    "192.168.3.64" :
    {
        "user" : {
            email : "",
            password : "",
        },
        "new_cc" : {
            card_number: "4111111111111111",
            cvv: "111",
            exp_date: "2015-11",
            address_1: "1400 N. W. 65th Place Fort Lauderdale, FL 33309",
            zip_code: "33309",
            city: "Fort Lauderdale",
            phone_1: "954",
            phone_2: "9177592",
            phone_3: "3009",
        },
        "shipping_info"  : {
            first_name : "tuan" ,
            last_name : "luu",
            address_1 : "123 abc",
            address_2 : null,
            zip_code : 'fjd21',
            city : 'hcm',
            phone_1 : '826',
            phone_2 : '1234345',
            phone_3 : '1235',
        },
    },
    "demo.games4fun.abcv.com" :
    {
        "user" : {
            email : "",
            password : "",
        },
        "new_cc" : {
            card_number: "4111111111111111",
            cvv: "111",
            exp_date: "2015-11",
            address_1: "1400 N. W. 65th Place Fort Lauderdale, FL 33309",
            zip_code: "33309",
            city: "Fort Lauderdale",
            phone_1: "954",
            phone_2: "9177592",
            phone_3: "3009",
        },
        "shipping_info"  : {
            first_name : "tran" ,
            last_name : "freb",
            address_1 : "123 abc",
            address_2 : null,
            zip_code : 'fjd21',
            city : 'hcm',
            phone_1 : '826',
            phone_2 : '1234345',
            phone_3 : '1235',
        },
    },
}
/** ================ Other ================== **/
window.store_data = {};
window.is_connect_server = false;
window.lottery_code = "abcv_lottery";