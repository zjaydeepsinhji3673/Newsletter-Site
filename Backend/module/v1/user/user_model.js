const conn = require('../../../config/database');
const common = require('../../../config/common');
const md5 = require('md5');
const auth_model = {

    login: function (req, callback) {
        let token = common.generateToken(10);
        var data = req.body;
        conn.query(`select * from tbl_user where  email = ? AND role = "User";`, [data.email], function (error, result) {
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

    register: function (req, callback) {
        var data = req.body
        common.CheckUnique(data, function (unique_values) {
            if (unique_values != null && unique_values.length > 0) {
                callback('0', 'error', unique_values);
            }
            else {
                let userdata = {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    mobile_number: data.mobile,
                    email: data.email,
                    password: md5(data.password),
                    role: 'User',
                    token: common.generateToken(15),
                }
                conn.query(`insert into tbl_user set ?;`, [userdata], function (error, result) {
                    if (error) {
                        callback('0', 'Error', error);

                    }
                    else {
                        conn.query(`select * from tbl_user where id = ?`, [result.insertId], function (error1, UserModel) {
                            if (error1) {
                                callback('0', 'Error', error1);

                            }
                            else {
                                callback('1', 'Success', UserModel);
                            }
                        })
                    }
                })
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

    add_news:function(req, callback){
        let data = req.body;

        let news_data = {
            user_id:req.user_id,
            title:data.title,
            description:data.description,
            image:data.newslatters,
            status:'pending'
        }
        conn.query(`insert into tbl_newsletter set ?`,[news_data],function(error, result){
            if(error){
                callback('0', 'Error', error)
            }
            else{
                callback('1','Success','Newsletter Created Successfully..')
            }
        })
    },

    get_data:function(req, callback){
        conn.query(`select n.*, concat('${process.env.IMAGE_PATH}',n.image) as image_url, u.first_name as user_name,DATE_FORMAT(n.created_at,'%d %M, %Y %l:%i %p') AS created_time from tbl_newsletter n JOIN tbl_user u on n.user_id = u.id where n.is_active = 1 and n.status = 'approved' order by n.id DESC;`,function(error,result){
            if(error){
                callback('0', 'Error', error)
            }
            else{
                callback('1','success',result);
            }
        })
    },

    get_my_news:function(req, callback){
        conn.query(`select n.*, concat('${process.env.IMAGE_PATH}',n.image) as image_url, u.first_name as user_name from tbl_newsletter n JOIN tbl_user u on n.user_id = u.id where n.is_active = 1 and u.id = ? order by n.id DESC;`,[req.user_id],function(error,result){
            if(error){
                
                callback('0', 'Error', error)
            }
            else{
                
                callback('1','success',result);
            }
        })
    },

    delete_news:function(req, callback){
        conn.query(`update tbl_newsletter set is_active = 2 where id = ?`,[req.body.news_id],function(error, result){
            if(error){
                
                callback('0', 'Error', error)
            }
            else{
                
                callback('1','success','News Deleted Succesfully...');
            }
        })
    }
}
module.exports = auth_model;