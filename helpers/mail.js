'use strict'

var emailTemplates  = require('email-templates').EmailTemplate;
var mailObject;

module.exports = {

    init: function(obj) {
        mailObject = obj;
        return mailObject;
    },

    /*
        Auxiliary function to send a single email
    */
    sendMail_newUser : function(to, params, callback) {

        // Merge html.jade with styles from style.css
        var template = new emailTemplates(__dirname + '/../views/email');

        // Render the html.jade into plain html
        template.render(params, function (err, results) {
        if (err) {
            //console.log("!!"+results.html);
            return console.error(err)
        }

        //console.log(results);

        // Send a single email
        mailObject.sendMail({
            from: 'Clinook <com>',//services@clinook.com>
            to: to,
            subject: '[Clinook] Registered User', //New USer
            html: results.html,
            attachments: [
            // {
            //   filename: 'Logo.png',
            //   path: __dirname + '/../public/img/Logo.png',
            //   cid: "logo@clinook.com" //same cid value as in the html img src
            // },
            {
                filename: 'Clinook-logo-gray.png',
                path: __dirname + '/../public/img/Clinook-logo-gray.png',
                cid: "logo@clinook.com" //same cid value as in the html img src
            }
            //,
            // {
            //   filename: 'nubes1.png',
            //   path: __dirname + '/../public/img/nubes1.png',
            //   cid: "nubes@clinook.com" //same cid value as in the html img src
            // }
            ]

        }, function(err, responseStatus) {
            if (err) {
            console.log('Error sending email: ' + err);
            callback(err);
            } else {
            console.log('Email sent: ' + responseStatus);
            callback(null);
            }
        });
        });

    },

  sendMail_alert : function(to, params, callback) {

    // Merge html.jade with styles from style.css
    var template = new emailTemplates(__dirname + '/../views/alert');
    //console.log(template);

    // Render the html.jade into plain html
    template.render(params, function (err, results) {
      if (err) {
        return console.error(err)
      }

      //console.log(results);

      // Send a single email
      mailObject.sendMail({
        from: 'Clinook <services@clinook.com>',
        to: to,
        subject: '[Clinook] Inventory Alert',
        html: results.html,
        attachments: [
          // {
          //   filename: 'Logo.png',
          //   path: __dirname + '/../public/img/Logo.png',
          //   cid: "logo@clinook.com" //same cid value as in the html img src
          // },
          {
            filename: 'Clinook-logo-gray.png',
            path: __dirname + '/../public/img/Clinook-logo-gray.png',
            cid: "logo@clinook.com" //same cid value as in the html img src
          }
          //,
          // {
          //   filename: 'nubes1.png',
          //   path: __dirname + '/../public/img/nubes1.png',
          //   cid: "nubes@clinook.com" //same cid value as in the html img src
          // }
        ]

      }, function(err, responseStatus) {
        if (err) {
          console.log('Error sending email: ' + err);
          callback(err);
        } else {
          console.log('Email sent: ' + responseStatus);
          callback(null);
        }
      });
    });

  },

  sendMail_recover : function(to, params, callback) {

    // Merge html.jade with styles from style.css
    var template = new emailTemplates(__dirname + '/../views/password_recover');
    //console.log(template);

    // Render the html.jade into plain html
    template.render(params, function (err, results) {
      if (err) {
        return console.error(err)
      }

      //console.log(results);

      // Send a single email
      mailObject.sendMail({
        from: 'Clinook <services@clinook.com>',
        to: to,
        subject: '[Clinook] Forgotten Password',
        html: results.html,
        attachments: [
          // {
          //   filename: 'Logo.png',
          //   path: __dirname + '/../public/img/Logo.png',
          //   cid: "logo@clinook.com" //same cid value as in the html img src
          // },
          {
            filename: 'Clinook-logo-gray.png',
            path: __dirname + '/../public/img/Clinook-logo-gray.png',
            cid: "logo@clinook.com" //same cid value as in the html img src
          }
          //,
          // {
          //   filename: 'nubes1.png',
          //   path: __dirname + '/../public/img/nubes1.png',
          //   cid: "nubes@clinook.com" //same cid value as in the html img src
          // }
        ]

      }, function(err, responseStatus) {
        if (err) {
          console.log('Error sending email: ' + err);
          callback(err);
        } else {
          console.log('Email sent: ' + responseStatus);
          callback(null);
        }
      });
    });

  },

  highPriorityMail : function(to, params, callback) {

    // Merge html.jade with styles from style.css
    var template = new emailTemplates(__dirname + '/../views/high_priority_order');
    //console.log(template);

    // Render the html.jade into plain html
    template.render(params, function (err, results) {
      if (err) {
        return console.error(err)
      }

      //console.log(results);

      // Send a single email
      mailObject.sendMail({
        from: 'Clinook <services@clinook.com>',
        to: to,
        subject: '[Clinook] High Priority Order',
        html: results.html,
        attachments: [
          // {
          //   filename: 'Logo.png',
          //   path: __dirname + '/../public/img/Logo.png',
          //   cid: "logo@clinook.com" //same cid value as in the html img src
          // },
          {
            filename: 'Clinook-logo-gray.png',
            path: __dirname + '/../public/img/Clinook-logo-gray.png',
            cid: "logo@clinook.com" //same cid value as in the html img src
          }
          //,
          // {
          //   filename: 'nubes1.png',
          //   path: __dirname + '/../public/img/nubes1.png',
          //   cid: "nubes@clinook.com" //same cid value as in the html img src
          // }
        ]

      }, function(err, responseStatus) {
        if (err) {
          console.log('Error sending email: ' + err);
          callback(err);
        } else {
          console.log('Email sent: ' + responseStatus);
          callback(null);
        }
      });
    });

  },


  sendMail_newPassword : function(to, params, callback) {

    // Merge html.jade with styles from style.css
    var template = new emailTemplates(__dirname + '/../views/new_password');
    //console.log(template);

    // Render the html.jade into plain html
    template.render(params, function (err, results) {
      if (err) {
        return console.error(err)
      }

      //console.log(results);

      // Send a single email
      mailObject.sendMail({
        from: 'Clinook <services@clinook.com>',
        to: to,
        subject: '[Clinook] Password has Changed',
        html: results.html,
        attachments: [
          // {
          //   filename: 'Logo.png',
          //   path: __dirname + '/../public/img/Logo.png',
          //   cid: "logo@clinook.com" //same cid value as in the html img src
          // },
          {
            filename: 'Clinook-logo-gray.png',
            path: __dirname + '/../public/img/Clinook-logo-gray.png',
            cid: "logo@clinook.com" //same cid value as in the html img src
          }
          //,
          // {
          //   filename: 'nubes1.png',
          //   path: __dirname + '/../public/img/nubes1.png',
          //   cid: "nubes@clinook.com" //same cid value as in the html img src
          // }
        ]

      }, function(err, responseStatus) {
        if (err) {
          console.log('Error sending email: ' + err);
          callback(err);
        } else {
          console.log('Email sent: ' + responseStatus);
          callback(null);
        }
      });
    });

  },


  sendMail_declinedUser : function(to, params, callback) {

    // Merge html.jade with styles from style.css
    var template = new emailTemplates(__dirname + '/../views/declined_user');


    // Render the html.jade into plain html
    template.render(params, function (err, results) {
      if (err) {
        //console.log("!!"+results.html);
        return console.error(err)
      }

      //console.log(results);

      // Send a single email
      mailObject.sendMail({
        from: 'Clinook <services@clinook.com>',//services@clinook.com>
        to: to,
        subject: '[Clinook] Declined User',
        html: results.html,
        attachments: [
          // {
          //   filename: 'Logo.png',
          //   path: __dirname + '/../public/img/Logo.png',
          //   cid: "logo@clinook.com" //same cid value as in the html img src
          // },
          {
            filename: 'Clinook-logo-gray.png',
            path: __dirname + '/../public/img/Clinook-logo-gray.png',
            cid: "logo@clinook.com" //same cid value as in the html img src
          }
          //,
          // {
          //   filename: 'nubes1.png',
          //   path: __dirname + '/../public/img/nubes1.png',
          //   cid: "nubes@clinook.com" //same cid value as in the html img src
          // }
        ]

      }, function(err, responseStatus) {
        if (err) {
          console.log('Error sending email: ' + err);
          callback(err);
        } else {
          console.log('Email sent: ' + responseStatus);
          callback(null);
        }
      });
    });

  },

  sendMail_approvedUser : function(to, params, callback) {

    // Merge html.jade with styles from style.css
    var template = new emailTemplates(__dirname + '/../views/approved_user');


    // Render the html.jade into plain html
    template.render(params, function (err, results) {
      if (err) {
        //console.log("!!"+results.html);
        return console.error(err)
      }

      //console.log(results);

      // Send a single email
      mailObject.sendMail({
        from: 'Clinook <services@clinook.com>',//<services@clinook.com>
        to: to,
        subject: '[Clinook] Approved User',
        html: results.html,
        attachments: [
          // {
          //   filename: 'Logo.png',
          //   path: __dirname + '/../public/img/Logo.png',
          //   cid: "logo@clinook.com" //same cid value as in the html img src
          // },
          {
            filename: 'Clinook-logo-gray.png',
            path: __dirname + '/../public/img/Clinook-logo-gray.png',
            cid: "logo@clinook.com" //same cid value as in the html img src
          }
          //,
          // {
          //   filename: 'nubes1.png',
          //   path: __dirname + '/../public/img/nubes1.png',
          //   cid: "nubes@clinook.com" //same cid value as in the html img src
          // }
        ]

      }, function(err, responseStatus) {
        if (err) {
          console.log('Error sending email: ' + err);
          callback(err);
        } else {
          console.log('Email sent: ' + responseStatus);
          callback(null);
        }
      });
    });

  },

  sendMail_resetPassword: function(to, params, callback) {

    // Merge html.jade with styles from style.css
    var template = new emailTemplates(__dirname + '/../views/reset_password');


    // Render the html.jade into plain html
    template.render(params, function (err, results) {
      if (err) {
        //console.log("!!"+results.html);
        return console.error(err)
      }

      //console.log(results);

      // Send a single email
      mailObject.sendMail({
        from: 'Clinook <services@clinook.com>',//services@clinook.com>
        to: to,
        subject: '[Clinook] Reset Password',
        html: results.html,
        attachments: [
          // {
          //   filename: 'Logo.png',
          //   path: __dirname + '/../public/img/Logo.png',
          //   cid: "logo@clinook.com" //same cid value as in the html img src
          // },
          {
            filename: 'Clinook-logo-gray.png',
            path: __dirname + '/../public/img/Clinook-logo-gray.png',
            cid: "logo@clinook.com" //same cid value as in the html img src
          }
          //,
          // {
          //   filename: 'nubes1.png',
          //   path: __dirname + '/../public/img/nubes1.png',
          //   cid: "nubes@clinook.com" //same cid value as in the html img src
          // }
        ]

      }, function(err, responseStatus) {
        if (err) {
          console.log('Error sending email: ' + err);
          callback(err);
        } else {
          console.log('Email sent: ' + responseStatus);
          callback(null);
        }
      });
    });

  },

  sendMail_updatePassword: function(to, params, callback) {

    // Merge html.jade with styles from style.css
    var template = new emailTemplates(__dirname + '/../views/update_password');


    // Render the html.jade into plain html
    template.render(params, function (err, results) {
      if (err) {
        //console.log("!!"+results.html);
        return console.error(err)
      }

      //console.log(results);

      // Send a single email
      mailObject.sendMail({
        from: 'Clinook <services@clinook.com>',//services@clinook.com>
        to: to,
        subject: '[Clinook] Update Password',
        html: results.html,
        attachments: [
          // {
          //   filename: 'Logo.png',
          //   path: __dirname + '/../public/img/Logo.png',
          //   cid: "logo@clinook.com" //same cid value as in the html img src
          // },
          {
            filename: 'Clinook-logo-gray.png',
            path: __dirname + '/../public/img/Clinook-logo-gray.png',
            cid: "logo@clinook.com" //same cid value as in the html img src
          }
          //,
          // {
          //   filename: 'nubes1.png',
          //   path: __dirname + '/../public/img/nubes1.png',
          //   cid: "nubes@clinook.com" //same cid value as in the html img src
          // }
        ]

      }, function(err, responseStatus) {
        if (err) {
          console.log('Error sending email: ' + err);
          callback(err);
        } else {
          console.log('Email sent: ' + responseStatus);
          callback(null);
        }
      });
    });

  },

  sendMail_newBasicUser : function(to, params, callback) {

    // Merge html.jade with styles from style.css
    var template = new emailTemplates(__dirname + '/../views/new_basic_user');


    // Render the html.jade into plain html
    template.render(params, function (err, results) {
      if (err) {
        //console.log("!!"+results.html);
        return console.error(err)
      }

      //console.log(results);

      // Send a single email
      mailObject.sendMail({
        from: 'Clinook <services@clinook.com>',//services@clinook.com>
        to: to,
        subject: '[Clinook] You’ve been invited',
        html: results.html,
        attachments: [
          // {
          //   filename: 'Logo.png',
          //   path: __dirname + '/../public/img/Logo.png',
          //   cid: "logo@clinook.com" //same cid value as in the html img src
          // },
          {
            filename: 'Clinook-logo-gray.png',
            path: __dirname + '/../public/img/Clinook-logo-gray.png',
            cid: "logo@clinook.com" //same cid value as in the html img src
          }
          //,
          // {
          //   filename: 'nubes1.png',
          //   path: __dirname + '/../public/img/nubes1.png',
          //   cid: "nubes@clinook.com" //same cid value as in the html img src
          // }
        ]

      }, function(err, responseStatus) {
        if (err) {
          console.log('Error sending email: ' + err);
          callback(err);
        } else {
          console.log('Email sent: ' + responseStatus);
          callback(null);
        }
      });
    });

  },

  sendMail_forgotPassword : function(to, params, callback) {

    // Merge html.jade with styles from style.css
    var template = new emailTemplates(__dirname + '/../views/forgot_password');


    // Render the html.jade into plain html
    template.render(params, function (err, results) {
      if (err) {
        //console.log("!!"+results.html);
        return console.error(err)
      }

      //console.log(results);

      // Send a single email
      mailObject.sendMail({
        from: 'Clinook <services@clinook.com>',//services@clinook.com>
        to: to,
        subject: '[Clinook] Reset Clinook password',
        html: results.html,
        attachments: [
          // {
          //   filename: 'Logo.png',
          //   path: __dirname + '/../public/img/Logo.png',
          //   cid: "logo@clinook.com" //same cid value as in the html img src
          // },
          {
            filename: 'Clinook-logo-gray.png',
            path: __dirname + '/../public/img/Clinook-logo-gray.png',
            cid: "logo@clinook.com" //same cid value as in the html img src
          }
          //,
          // {
          //   filename: 'nubes1.png',
          //   path: __dirname + '/../public/img/nubes1.png',
          //   cid: "nubes@clinook.com" //same cid value as in the html img src
          // }
        ]

      }, function(err, responseStatus) {
        if (err) {
          console.log('Error sending email: ' + err);
          callback(err);
        } else {
          console.log('Email sent: ' + responseStatus);
          callback(null);
        }
            });
        });
    },
};
