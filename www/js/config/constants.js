/** ================ Environment ================== **/
window.is_dev = false;
window.is_use_payment = true;
/** ================ Server Information ================== **/
window.server_ip = "demo.games4fun.abcv.com"; //demo server

window.server_ip_list = [
    { name: "Select Server", ip: "-1" },
    { name: "Huy.Tran", ip: "192.168.3.17" },
    { name: "Tram.Nguyen", ip: "192.168.3.77" },
    { name: "Nguyen.Ly", ip: "192.168.3.43" },
    { name: "Anh.Luu", ip: "192.168.3.64" },
    { name: "Demo.kootoro", ip: "demo.games4fun.abcv.com"},
];

window.server_post = "8000";
window.server_url = "http://" + window.server_ip + ":80";
window.is_device = window.cordova;
/** ================ Application Information ================== **/
window.version = 2;
window.version_application = "2.0.191";	//It will be updated by config.xml
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
        uuid: "192.168.3.43",
        version: "window8",
        name: "ABCV-VN-23",
        platform: "Android",
    };
}
/** ================ Other ================== **/
window.store_data = {};
window.is_connect_server = false;