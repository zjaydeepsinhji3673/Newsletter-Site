const conn = require('../../../config/database');
const common = require('../../../config/common');
const md5 = require('md5');
const auth_model = {

    login: function (req, callback) {
        let token = common.generateToken(10);
        var data = req.body;
        conn.query(`select * from tbl_user where  email = ? AND role = "Admin";`, [data.email], function (error, result) {
            if (error) {
                callback('0', 'Error', error);
            }
            else {
                if (result.length > 0) {
                    if (result[0].password == md5(data.password)) {
                        if (result[0].is_active == 1) {

                            conn.query(`update tbl_user set token = ? where id = ?`, [token, result[0].id], function (error1, result1) {
                                if (error1) {
                                    callback('0', 'Error', error1);
                                }
                                else {
                                    conn.query(`select * from tbl_user where id = ?`, [result[0].id], function (error2, result2) {
                                        if (error2) {
                                            callback('0', 'Error', error2);
                                        }
                                        else {
                                            callback('1', 'Success', result2);
                                        }
                                    })
                                }
                            })
                        }
                        else {
                            callback('3', 'Error', 'In Active User')
                        }
                    }
                    else {
                        callback('0', 'Error', 'Your Entered Passwrod is Wrong, Please Enter Currect Password')
                    }
                }
                else {
                    callback('0', 'Error', 'Your Entered Email is Wrong, Please Enter Currect Email')
                }
            }
        })
    },

    logout: function (req, callback) {
        conn.query(`update tbl_user set token = null where id = ?`, [req.user_id], function (error, result) {
            if (error) {
                callback('0', 'Error', error)
            }
            else {
                callback('1', 'Success', 'Logout Successyfully..');
            }
        })
    },

    get_all_data:function(req, callback){
        conn.query(`select n.*, concat('${process.env.IMAGE_PATH}',n.image) as image_url, u.first_name as user_name from tbl_newsletter n JOIN tbl_user u on n.user_id = u.id where n.is_active = 1 order by n.id DESC;`,function(error,result){
            if(error){
                callback('0', 'Error', error)
            }
            else{
                callback('1','success',result);
            }
        })
    },

    update_news:function(req, callback){
        let data = req.body
        conn.query(`update tbl_newsletter set status = ? where id = ?`,[data.status, data.news_id],function(error,result){
            if(error){
                callback('0', 'Error', error)
            }
            else{
                callback('1','success','data Updated..');
            }
        })
    },

    all_count:function(req, callback){
        conn.query(`SELECT COUNT(id) as user FROM tbl_user WHERE role='User' and is_active = 1;
        SELECT COUNT(id) as newsletter FROM tbl_newsletter where is_active =1;
        SELECT COUNT(id) as pnews FROM tbl_newsletter WHERE status='pending';
        SELECT COUNT(id) as rnews FROM tbl_newsletter WHERE status='rejected';
        SELECT COUNT(id) as anews FROM tbl_newsletter WHERE status='approved';`, function (error, result) {
            if (error) {
                callback('0', 'Error', error);
            }
            else {
                callback('1', 'Success', result);
            }
        })
    }
}
module.exports = auth_model;