try { 
	var eventName = window.location.pathname.split('/')[1];

  // --- existing code ---  //
  webengage.onReady(function() {
    /*    if (window.location.pathname == '/') {
            webengage.track('home page viewed', {
                'host': window.location.host
            });
        } else if (eventName) {
            eventName += " page viewed";
            webengage.track(eventName, {
                'host': window.location.host
            });
        }
    */
    _weq['webengage.ruleData'] = webengage.util.copy(_weq['webengage.ruleData'] || {}, {
      "visitorBucket": (function() {
        var _hash = webengage.util.getHashCode(webengage.util.getWebengageCookie().luid);
        return Math.abs(_hash % 100);
      })()
    }, true);
    webengage.util.withWeJquery(function() {
      webengage.notification.onOpen(function(notification) {
        var notFrame = $weJQuery("#webklipper-publisher-widget-container-notification-frame");
        var layout = $weJQuery(notFrame).attr('data-notification-layout-name');
        var layoutId = $weJQuery(notFrame).attr('data-notification-layout-id');
        if (layout === 'header-desktop') {
          var notHeight = notFrame.contents().find(".wrapper").height();
          setTimeout(function() {
            $weJQuery("<style type='text/css'>  #webklipper-publisher-widget-container-notification-frame {height:" + notHeight + "px !important;} body .webengage-push-down {height:" + notHeight + "px !important;} </style>").appendTo("head");
          }, 500);
        } else if (layoutId === '~fg00aad') {
          $weJQuery(".row.mhf-header.mhf-fix").css('top', $weJQuery("#webklipper-publisher-widget-container-notification-frame").contents().find(".wrapper").outerHeight() + "px");
        }
      });
      webengage.notification.onClose(function(notification) {
        var notFrame = $weJQuery("#webklipper-publisher-widget-container-notification-frame");
        var layout = $weJQuery(notFrame).attr('data-notification-layout-name');
        var layoutId = $weJQuery(notFrame).attr('data-notification-layout-id');
        if (layoutId === '~fg00aad') {
          $weJQuery(".row.mhf-header.mhf-fix").css('top', 0);
        }
      });
      webengage.notification.onClick(function(notification) {
        var notFrame = $weJQuery("#webklipper-publisher-widget-container-notification-frame");
        var layout = $weJQuery(notFrame).attr('data-notification-layout-name');
        var layoutId = $weJQuery(notFrame).attr('data-notification-layout-id');
        if (layoutId === '~fg00aad') {
          $weJQuery(".row.mhf-header.mhf-fix").css('top', 0);
        }
      });
    });
  });

  // --- new code ---  //



  // var eventName = 'sch';

  var dom = webengage.require('webengage/dom');
  var ua = webengage.require('webengage/ua');

  _chkForNull = function(value) {
    return value === undefined || value === null ? "" : value;
  };

  _getInnerHTML = function(el) {
    return (el ? el.innerHTML : null);
  };

  htmlDecode = function(input) {
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  };

  //my pageview for mobile website no attributes order and wishlist page 

  var eventAttributeMap = {
    //sc serach on mobile page _weq not found 
    'sch': {
      eventName: 'Search PV',
      attributes: [{
        'name': 'Search word',
        'selector': function() {
          var x = dom.queryOne("#gh-ac-box2 input").value;
          if (x) {
            return x;
          }
        },
        'Mobselector': function() {
          if (dom.queryOne('#keyword .search-bar-kwtext') !== null) {
          var x = dom.queryOne('#keyword .search-bar-kwtext').innerHTML;
          if (x) {
            return x;
          }
          }
          else
          {
            return null;
          }
        }
      }, {
        'name': 'Search Keyword',
        'selector': function() {
          var a = dom.query('#RelatedSearchesContainer .rls a').length;
          searchKeyword = [];
          for (var i = 0; i < a; i++) {
            searchKeyword.push(dom.query('#RelatedSearchesContainer .rls a')[i].innerHTML);
          }
          return searchKeyword;
        },
        'Mobselector': function() {
          return null;
        }
      }, {
        'name': 'Item Count',
        'selector': function() {
          var stringVal = dom.queryOne('#bciw > .bclt > span').innerHTML;
          var value = 0;
          if (stringVal) {
            value = parseInt(stringVal.substring(0, stringVal.indexOf('listings')).trim().replace(/,/g, ''));
          }
          return value;
        },
        'Mobselector': function() {
          var x = parseInt(dom.queryOne('.col-xs-4.srp-count b').innerHTML);;
          if (x) {
            return x;
          }
        }
      },  {
        'name':'host',
        'selector':function(){return window.location.host;},
        'Mobselector':function(){return window.location.host;}
      }]
    },
    //in case user adds a title and description filter page URL to dsc SAME as sch. 
    'dsc': {
      eventName: 'DSC PV',
      attributes: [{
        'name': 'Search word',
        'selector': function() {
          var x = dom.queryOne("#gh-ac-box2 input").value;
          if (x) {
            return x;
          }
        }
      }, {
        'name': 'Search Keyword',
        'selector': function() {
          var a = dom.query('#RelatedSearchesContainer .rls b').length;
          searchKeyword = [];
          for (var i = 0; i < a; i++) {
            searchKeyword.push(dom.query('#RelatedSearchesContainer .rls b')[i].innerHTML);
          }
          return searchKeyword;
        }
      }, {
        'name': 'Item Count',
        'selector': function() {
          var stringVal = dom.queryOne('#bciw > .bclt > span').innerHTML;
          var value = 0;
          if (stringVal) {
            value = parseInt(stringVal.substring(0, stringVal.indexOf('listings')).trim().replace(/,/g, ''));
          }
          return value;
        }
      },  {
        'name':'host',
        'selector':function(){return window.location.host;},
        'Mobselector':function(){return window.location.host;}
      }]
    },
    //mobile selector for the itm page 
    'itm': {
      eventName: 'Item PV',
      attributes: [{
          'name': 'Product Id',
          'selector': function() {
            return dom.queryOne('#descItemNumber').innerHTML;
          },
          'Mobselector': function() {
            return dom.queryOne('[name="itemID"]').getAttribute('value');
          }

        }, {
          'name': 'Product name',
          'selector': function() {
            return dom.queryOne('#itemTitle').innerText;
          },
          'Mobselector': function() {
            return dom.queryOne('[itemprop="name"]').innerHTML;
          }

        },

        {
          'name': 'Category Name',
          'selector': function() {
            var categoryName = dom.queryOne(".bc-w a span").innerHTML;
            return htmlDecode(categoryName);
          },
          'Mobselector': function() {
            return null;
          }

        }, {
          'name': 'Sub Category Name',
          'selector': function() {
            if (dom.queryOne("#vi-VR-brumb-lnkLst > table > tbody > tr > td > h2 > ul > li:nth-child(3) > a > span") > 1) {
              var subName = dom.queryOne("#vi-VR-brumb-lnkLst > table > tbody > tr > td > h2 > ul > li:nth-child(3) > a > span").innerHTML;
              return htmlDecode(subName);
            } else {
              return null;
            }
          },
          'Mobselector': function() {
            return null;
          }

        }, {
          'name': 'seller_name',
          'selector': function() {
            var c = dom.queryOne("#mbgLink span");
            return _getInnerHTML(c);
          },
          'Mobselector': function() {
            var c = dom.queryOne("#defSellerInfo .media-body .media-heading.rating-star").innerText;
            if (c) {
              return c;
            }
          }

        }, {
          'name': 'seller_feedback',
          'selector': function() {
            var d = dom.queryOne("#si-fb").innerHTML;
            _chkForNull(d);
            d = parseFloat(d.substring(0, d.indexOf('%')).replace(/,/g, ''));
            return d;
          },
          'Mobselector': function() {
            var d = dom.queryOne("#defSellerInfo .media-body p:nth-child(2)").innerHTML;
            if (d) {
              var d = parseFloat(d.substring(0, d.indexOf('%')).replace(/,/g, ''));
              return d;
            }
          }

        }, {
          'name': 'seller_score',
          'selector': function() {
            var parent = dom.queryOne("#si-fb").parentNode;
            var e = dom.queryOne("span > a", parent);
            // var e = dom.queryOne("#RightSummaryPanel > div.si-cnt.si-cnt-eu > div > div > div > div.bdg-90 > div.mbg > span > a").innerHTML;    

            return _getInnerHTML(e);
          },
          'Mobselector': function() {
            return null;
          }

        }, {
          'name': 'Price',
          'selector': function() {
            var f = dom.queryOne("#prcIsum").getAttribute("content");
            _chkForNull(f);
            f = parseFloat(f);
            return f;
          },
          'Mobselector': function() {
            var d = dom.queryOne('[property="product:price:amount"]').getAttribute('content');
            if (d) {
              d = parseFloat(d);
              return d;
            }

          }

        }, {
          'name': 'Product_images',
          'selector': function() {
            var tag = dom.query('#vi_main_img_fs img').length;
            var imageList = [];
            if(tag > 0){
            for (var i = 0; i < tag; i++) {
              // console.log(dom.query('#vi_main_img_fs img')[i].src.replace('-l64', '-l500'));
              imageList.push(dom.query('#vi_main_img_fs img')[i].src.replace('-l64', '-l500'));
            }
          }else {
            var tag2 = dom.queryOne('#icImg').src;
            imageList.push(tag2);
          }
            return imageList;
          },
          'Mobselector': function() {
            var tag = dom.query('#slider > div > div > img').length;
            var timageList = [];
            for (var i = 0; i < tag; i++) {
              timageList.push(dom.query('#slider > div > div > img')[i].src);
            }
            return timageList;
          }

        },

        {
          'name': 'Small_Product_images',
          'selector': function() {
            var tag = dom.query('#vi_main_img_fs img').length;
            var simageList = [];
              if(tag > 0){
            for (var i = 0; i < tag; i++) {
              // console.log(dom.query('#vi_main_img_fs img')[i].src.replace('-l64', '-l500'));
              simageList.push(dom.query('#vi_main_img_fs img')[i].src);
            }
          }else{
            var tag2 = dom.queryOne('#icImg').src;
            simageList.push(tag2);
          }
            return simageList;
          },
          'Mobselector': function() {
            var tag = dom.query('#slider > div > div > img').length;
            var limageList = [];
            for (var i = 0; i < tag; i++) {
              limageList.push(dom.query('#slider > div > div > img')[i].src.replace('-l300', '-l64'));
            }
            return limageList;
          }

        }
      ,  {
        'name':'host',
        'selector':function(){return window.location.host;},
        'Mobselector':function(){return window.location.host;}
      }]
    },
    // cart page desktop 
    'sc': {
      eventName: 'Cart PV',
      attributes: [{
        'name': 'product_details',
        'selector': function() {
          var title = dom.query(".xo-sc-itm .xo-itm-grid li:nth-child(3) div:nth-child(1) a");
          var img = dom.query(".xo-sc-itm .xo-itm-grid li:nth-child(2) a");
          var quantity = dom.query(".xo-sc-itm .xo-itm-grid li:nth-child(4) div input");
          var Product_price = dom.query(".xo-slr1 .xo-sc-itm .xo-slritm .xo-itm-grid .item.xo-itm-4 .xo-itm-cst .xo-price-frpr10 span:nth-child(2)");
          var product = [];
          for (var i = 0; i < title.length; i++) {
            product.push({
              "product_title": title[i].innerHTML,
              "product_img": img[i].href,
              "product_quantity": parseInt(quantity[i].value),
              "product_price": parseInt(Product_price[i].innerHTML.replace(',', ''))
            });
          }
          return product;
        },
        'Mobselector': function() {
          return null;
        }
      }, {
        'name': 'Order_total',
        'selector': function() {
          var a = dom.queryOne(".xo-ct-ttl").innerHTML.split(' ')[29].replace(',', '');
          if (a) {
            return parseFloat(a);
          }
        },
        'Mobselector': function() {
          return null;
        }
      },  {
        'name':'host',
        'selector':function(){return window.location.host;},
        'Mobselector':function(){return window.location.host;}
      }]
    },
    // cart mobile page 
    'cart': {
      eventName: 'Cart PV',
      attributes: [{
          'name': 'product_details',
          'selector': function() {
            return null;
          },
          'Mobselector': function() {
            var title = dom.query(".cart-links div:nth-child(2) > .cart-item .cart-item-body a h2");
            var img = dom.query(".cart-links div:nth-child(2) > .cart-item .item-img .ds3-img span img");
            var quantity = dom.query(".cart-links div:nth-child(2) > .cart-item .item-img .cart-qty .cart-qty-input input");
            var Product_price = dom.query(".cart-item .cart-item-body H3");
            var product = [];
            for (var i = 0; i < title.length; i++) {
              product.push({
                "product_title": title[i].innerHTML,
                "product_img": img[i].src,
                "product_quantity": parseInt(quantity[i].value),
                "product_price": parseInt(Product_price[i].innerHTML.replace(',', '').match(/\d+/g).map(Number)[0])
              });
            }
            return product;
          }
        },
        //newly added; check for the desktop cart page add this Order_total
        {
          'name': 'Order_total',
          'selector': function() {
            return null;
          },
          'Mobselector': function() {
            var x = dom.query(".cart-total span")[0].innerHTML.trim().split(' ')[1].replace(',', '');
            return parseFloat(x);
          }
        },  {
        'name':'host',
        'selector':function(){return window.location.host;},
        'Mobselector':function(){return window.location.host;}
      }]
    },

    'ReviewOrder': {
      eventName: 'Review Order PV',
      attributes: [{
        'name': 'product_details',
        'selector': function() {
          var quantity = dom.query(".xo-ro-bkt .xo-slritm .xo-itm-grid li:nth-child(2) input");
          var title = dom.query(".xo-ro-bkt .xo-slritm .xo-itm-grid li:nth-child(1) div.xo-ww-ttl");
          var price = dom.query(".xo-ro-bkt .xo-slritm .xo-itm-grid li:nth-child(2) div > div span:nth-child(2)");
          product_details = [];
          for (var i = 0; i < title.length; i++) {
            product_details.push({
              'product_title': title[i].innerHTML,
              'product_quantity': parseFloat(quantity[i].value),
              'product_price': parseFloat(price[i].innerHTML)
            });
          }
          return product_details;
        },
        'Mobselector': function() {
          return null;
        }
      }, {
        'name': 'Grand_total',
        'selector': function() {
          var grand = parseFloat(dom.queryOne("#gndTotalAmt").getAttribute("data-carttot"));
          if (grand) {
            return grand;
          }

        },
        'Mobselector': function() {
          return null;
        }
      },  {
        'name':'host',
        'selector':function(){return window.location.host;},
        'Mobselector':function(){return window.location.host;}
      }]
    },
    //payment desktop page 
    'pp': {
      eventName: 'DT Payment PV',
      attributes: [{
        'name': 'total',
        'selector': function() {
          var total = dom.queryOne(".xo-p-m").getAttribute("org-val");
          if (total) {
            return parseFloat(total);
          }
        },
        'Mobselector': function() {
          return null;
        }
      },  {
        'name':'host',
        'selector':function(){return window.location.host;},
        'Mobselector':function(){return window.location.host;}
      }]
    },
    //MOBILE review page 
    'xo': {
      eventName: 'Review Order PV',
      attributes: [{
        'name': 'product_details',
        'selector': function() {
          var title = dom.query(".r-group .media.r-item .col-md-12 .media-heading a");
          var price = dom.query(".r-line .r-price b");
          var quantity = dom.query(".r-quantity input");
          var product = [];
          for (var i = 0; i < title.length; i++) {
            product.push({
              'product_title': title[i].innerHTML.trim(),
              'product_price': parseFloat(price[i].innerHTML.split(' ')[1].replace(',', '')),
              'product_quantity': quantity[i].value
            });
          };
          return product;
        },
        'Mobselector': function() {
          var title = dom.query(".r-group .media.r-item .col-md-12 .media-heading a");
          var price = dom.query(".r-line .r-price b");
          var quantity = dom.query(".r-quantity input");
          var product = [];
          for (var i = 0; i < title.length; i++) {
            product.push({
              'product_title': title[i].innerHTML.trim(),
              'product_price': parseFloat(price[i].innerHTML.split(' ')[1].replace(',', '')),
              'product_quantity': quantity[i].value
            });
          };
          return product;
        }
      }, {
        'name': 'Grand_total',
        'selector': function() {
          var tot = dom.queryOne(".r-order dd:nth-child(6) b").innerHTML.split(" ")[1].replace(',', '');
          if (tot) {
            return parseFloat(tot);
          }
        },
        'Mobselector': function() {
          var tot = dom.queryOne(".r-order dd:nth-child(6) b").innerHTML.split(" ")[1].replace(',', '');
          if (tot) {
            return parseFloat(tot);
          }
        }
      },  {
        'name':'host',
        'selector':function(){return window.location.host;},
        'Mobselector':function(){return window.location.host;}
      }]
    },
    //post order placed Mobile view 
    'txn': {
      eventName: 'txn PV',
      attributes: [{
        'name': 'paisapay-id',
        'selector': function() {

          return null;
        },
        'Mobselector': function() {
          var x = dom.queryOne("#mainContent > div.container > div > div:nth-child(1) > div.row.paisapay-id > div > h2:nth-child(2)");
          if (x) {
            x = x.innerHTML;
            x = parseInt(x.substr(x.indexOf(': '), x.length).replace(/: /g, ''));
            return x;
          }
        }
      }, {
        'name': 'Grand_total',
        'selector': function() {
          var total = dom.queryOne('.xo-oc-cpa label').innerHTML.split('</span>')[1].trim().replace(',','');
          if (total) {
            return parseFloat(total);
          }
        },
        'Mobselector': function() {
          return parseFloat(dom.queryOne("[mui-label-grand-total]").innerHTML.trim().replace('Rs. ','').replace(',',''));
        }
      },{
        'name': 'OrderInfo',
        'selector': function() {
          return null;
        },
        'Mobselector': function() {
          var sellerName = dom.query('.mui-module.oc-cart .row .col-md-12 .oc-dl.oc-dl-seller dd b');
          var Product_images = dom.query('.row.oc-line .col-md-12 .media.oc-item span > span > a');
          var product_name = dom.query('.row.oc-line .col-md-12 .media.oc-item .media-body .media-heading > a');
          var quantity = dom.query('div.row.oc-line:nth-child(3) .col-md-12 .oc-keyval b.oc-value');
          var Price = dom.query('div.row.oc-line:nth-child(4) .col-md-12 .oc-keyval b.oc-value');
          var name = [];
          if (sellerName) {
            for (var i = 0; i < sellerName.length; i++) {
              name.push({
                'seller_name': sellerName[i].innerHTML,
                'product_img': Product_images[i].href,
                'product_name': product_name[i].innerHTML.trim(),
                'quantity': parseInt(quantity[i].innerHTML),
                'price': parseInt(Price[i].innerHTML.trim().replace('Rs.', ''))
              });

            }
            return name;
          }
        }
      },  {
        'name':'host',
        'selector':function(){return window.location.host;},
        'Mobselector':function(){return window.location.host;}
      }]
    },
    //order confirm post payment desktop 
    'OrderConfirm': {
      eventName: 'Order Confirm PV',
      attributes: [{
        'name': 'paisapay-id',
        'selector': function() {
          var total = dom.queryOne('body > div.xo-container > div.xo-dib > div.xo-oc-msg > p > b').innerHTML;
          if (total) {
            return parseInt(total);
          }
        },
        'Mobselector': function() {
          return null;
        }
      }, {
        'name': 'Grand_total',
        'selector': function() {
          var total = dom.queryOne('.xo-oc-cpa label').innerHTML.split('</span>')[1].trim();
          if (total) {
            return parseInt(total);
          }
        },
        'Mobselector': function() {
          return parseFloat(dom.queryOne("[mui-label-grand-total]").innerHTML.trim().replace('Rs. ',''));
        }
      }, {
        'name': 'OrderInfo',
        'selector': function() {
          var sellerName = dom.query('.xo-oc-slrc ul li .xo-oc-slri .xo-oc-vcd p');
          var Product_images = dom.query('.xo-oc-slrc ul li .xo-oc-slri .xo-oc-ic70 span.l-shad.lftd span a');
          var product_name = dom.query('.xo-oc-slrc ul li .xo-oc-odi ul .xo-oc-h50');
          var quantity = dom.query('.xo-oc-slrc ul li .xo-oc-odi ul li:nth-child(2) > div');
          var Price = dom.query('.xo-oc-slrc ul li .xo-oc-odi ul li:nth-child(3) div span');
          var name = [];
          if (sellerName) {
            for (var i = 0; i < sellerName.length; i++) {
              name.push({
                'seller_name': sellerName[i].innerHTML.replace('from ', ''),
                'product_img': Product_images[i].href,
                'product_name': product_name[i].getAttribute('title'),
                'quantity': parseInt(quantity[i].innerHTML),
                'price': parseInt(Price[i].innerHTML.replace('Rs.', ''))
              });

            }
            return name;
          }
        },
        'Mobselector': function() {
          return null;
        }
      },  {
        'name':'host',
        'selector':function(){return window.location.host;},
        'Mobselector':function(){return window.location.host;}
      }]
    },
    'mobinxo': {
      eventName: 'Review Order PV',
      attributes: [{
        'name': 'product_details',
        'selector': function() {
          return null;
        },
        'Mobselector': function() {
          var title = dom.query(".r-group .media.r-item .col-md-12 .media-heading a");
          var price = dom.query(".r-line .r-price b");
          var quantity = dom.query(".r-quantity input");
          var product = [];
          for (var i = 0; i < title.length; i++) {
            product.push({
              'product_title': title[i].innerHTML.trim(),
              'product_price': parseFloat(price[i].innerHTML.split(' ')[1].replace(',', '')),
              'product_quantity': quantity[i].value
            });
          };
          return product;
        }
      }, {
        'name': 'Grand_total',
        'selector': function() {
          return null;
        },
        'Mobselector': function() {
          var tot = dom.queryOne(".r-order dd:nth-child(6) b").innerHTML.split(" ")[1].replace(',', '');
          if (tot) {
            return parseFloat(tot);
          }
        }
      },  {
        'name':'host',
        'selector':function(){return window.location.host;},
        'Mobselector':function(){return window.location.host;}
      }]
    },
    'GuestOrderConfirm': {
      eventName: 'Order Confirm PV',
      attributes: [{
        'name': 'paisapay-id',
        'selector': function() {
          var total = dom.queryOne('body > div.xo-container > div.xo-dib > div.xo-oc-msg > p > b').innerHTML;
          if (total) {
            return parseInt(total);
          }
        },
        'Mobselector': function() {
          return null;
        }
      }, {
        'name': 'Grand_total',
        'selector': function() {
          var total = dom.queryOne('.xo-oc-cpa label').innerHTML.split('</span>')[1].trim();
          if (total) {
            return parseInt(total);
          }
        },
        'Mobselector': function() {
          return parseFloat(dom.queryOne("[mui-label-grand-total]").innerHTML.trim().replace('Rs. ',''));
        }
      }, {
        'name': 'OrderInfo',
        'selector': function() {
          var sellerName = dom.query('.xo-oc-slrc ul li .xo-oc-slri .xo-oc-vcd p');
          var Product_images = dom.query('.xo-oc-slrc ul li .xo-oc-slri .xo-oc-ic70 span.l-shad.lftd span a');
          var product_name = dom.query('.xo-oc-slrc ul li .xo-oc-odi ul .xo-oc-h50');
          var quantity = dom.query('.xo-oc-slrc ul li .xo-oc-odi ul li:nth-child(2) > div');
          var Price = dom.query('.xo-oc-slrc ul li .xo-oc-odi ul li:nth-child(3) div span');
          var name = [];
          if (sellerName) {
            for (var i = 0; i < sellerName.length; i++) {
              name.push({
                'seller_name': sellerName[i].innerHTML.replace('from ', ''),
                'product_img': Product_images[i].href,
                'product_name': product_name[i].getAttribute('title'),
                'quantity': parseInt(quantity[i].innerHTML),
                'price': parseInt(Price[i].innerHTML.replace('Rs.', ''))
              });

            }
            return name;
          }
        },
        'Mobselector': function() {
          return null;
        }
      },  {
        'name':'host',
        'selector':function(){return window.location.host;},
        'Mobselector':function(){return window.location.host;}
      }]
    },
    'rpp': {
      eventName: 'DT RPP PV',
      attributes: [{
        'name': 'CategoryRpp',
        'selector': function() {
          return window.location.pathname.split('/')[2];
        },
        'Mobselector': function() {
          return null;
        }
      },  {
        'name':'host',
        'selector':function(){return window.location.host;},
        'Mobselector':function(){return window.location.host;}
      }]
    },
    'category': {
      eventName: 'mWeb CAT PV',
      attributes: [{
        'name': 'CategoryCaptured',
        'selector': function() {
          return null;
        },
        'Mobselector': function() {
          CategoryCaptured = [];
          var cat = dom.query('.col-md-12.ripple .offshowtext').length;
          for (var i = 0; i < cat; i++) {
            CategoryCaptured.push({
              'category': htmlDecode(dom.query('.col-md-12.ripple .offshowtext')[i].innerHTML)
            });
          }
          return CategoryCaptured;
        }
      },  {
        'name':'host',
        'selector':function(){return window.location.host;},
        'Mobselector':function(){return window.location.host;}
      }]
    },
    'deals': {
      eventName: 'DT Deals PV',
      attributes: [{
        'name': 'product_name',
        'selector': function() {
          return dom.queryOne('.dne-itemtile-title.ellipse-3').getAttribute('title');
        },
        'Mobselector': function() {
          return null;
        }

      }, {
        'name': 'price',
        'selector': function() {
          return parseInt(dom.queryOne('[itemprop="price"]').innerHTML.replace('Rs.', '').trim());
        },
        'Mobselector': function() {
          return null;
        }
      },  {
        'name':'host',
        'selector':function(){return window.location.host;},
        'Mobselector':function(){return window.location.host;}
      }]
    }
  };


  var attributes = {};


  var trackEventName = eventName;


  function isMobile() {
    return window.location.href.indexOf('m.ebay.in') > -1;
  }

  if (eventName && eventAttributeMap[eventName]) {
    trackEventName = eventAttributeMap[eventName].eventName;
    eventAttributeMap[eventName].attributes.map(function(attributeSelector) {
      if (isMobile()) {
        attributes[attributeSelector.name] = attributeSelector.Mobselector();
      } else {
        attributes[attributeSelector.name] = attributeSelector.selector();
      }
    });
  }

  //console.log(' log :',eventName);

  if (eventName === 'txn' && window.location.pathname.indexOf('order_confirmation') > -1) {
    trackEventName = 'Order Confirm PV';
  } else if (window.location.pathname.indexOf('review_your_order') > -1) {
    trackEventName = 'Review Order PV';
  } else if (window.location.pathname == '/') {
    trackEventName = 'Home PV';
  }

  webengage.screen({
    eventName: trackEventName,
    attributes: attributes
  });
  webengage.track(trackEventName, attributes);


 } catch(e) { 
 	if (e instanceof Error) { 
		var data = e.stack || e.description;
		data = (data.length > 900 ? data.substring(0, 900) : data);
	 	webengage.eLog(null, 'error', data, 'cwc-error','cwc', '~a61h7gl');
	 }
 }
