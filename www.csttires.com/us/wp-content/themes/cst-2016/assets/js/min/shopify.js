/*<![CDATA[*/
(function() {
    var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
    var shopify_options = {
		"product": {
			"iframe": false,			
			"styles": {
				"product": {
					"@media (min-width: 601px)": {
						"max-width": "calc(25% - 20px)",
						"margin-left": "20px",
						"margin-bottom": "50px"
					},
					"text-align": "left"
				},
				"button": {
					"font-family": "Proxima Nova!important",
					"font-weight": "bold",
					"font-size": "14px",
					"padding": "10px",
					"line-height": "18px",
    				"border": "3px solid #fd4703",
    				"background-color": "#fd4703",
					"color": "#fff",
					"min-width": "initial",
					"margin-top": "-20px!important",
					"border-radius": "0px",
					"width": "100%",
					"max-width": "175px",
					"text-transform": "uppercase",
					":hover": {
						"color": "#fff",
						"border-color": "#c82600",
						"background-color": "#c82600",
					},
					":focus": {
						"color": "#fff",
						"border-color": "#c82600",
						"background-color": "#c82600",
						"outline": "none"
					}
				},
				"quantityInput": {
					"font-size": "14px",
					"padding-top": "15px",
					"padding-bottom": "15px"
				}
			},
			"buttonDestination": "modal",
			"contents": {
				"img": false,
				"title": false,
				"price": false,
				"options": false
			},
			"text": {
				"button": "BUY NOW"
			},
			"googleFonts": [
				"Montserrat"
			]
		},
		"productSet": {
			"styles": {
				"products": {
					"@media (min-width: 601px)": {
						"margin-left": "-20px"
					}
				}
			}
		},
		"modalProduct": {
			"iframe": false,
			"contents": {
				"img": false,
				"imgWithCarousel": true,
				"button": false,
				"buttonWithQuantity": true
			},
			"styles": {
				"product": {
					"@media (min-width: 601px)": {
						"max-width": "100%",
						"margin-left": "0px",
						"margin-bottom": "0px"
					}
				},
				"button": {
					"font-family": "Proxima Nova!important",
					"font-weight": "bold",
					"font-size": "14px",
					"padding-top": "15px",
					"padding-bottom": "15px",
					"text-transform": "uppercase",
					":hover": {
						"background-color": "#e44003"
					},
					"background-color": "#fd4703",
					":focus": {
						"background-color": "#e44003"
					},
					"padding-left": "25px",
					"padding-right": "25px"
				},
				"quantityInput": {
					"font-size": "14px",
					"padding-top": "15px",
					"padding-bottom": "15px"
				}
			},
			"googleFonts": [
				"Montserrat"
			],
			"text": {
				"button": "Add to cart"
			}
		},
		"cart": {
			// "iframe": false,
			"styles": {
				"button": {
					"font-family": "Proxima Nova!important",
					"font-weight": "bold",
					"font-size": "14px",
					"padding-top": "15px",
					"padding-bottom": "15px",
					"text-transform": "uppercase",
					":hover": {
						"background-color": "#e44003"
					},
					"background-color": "#fd4703",
					":focus": {
						"background-color": "#e44003"
					}
				}
			},
			"text": {
				"total": "Subtotal",
				"button": "Checkout"
			},
			"googleFonts": [
				"Montserrat"
			]
		},
		"toggle": {
			"styles": {
				"toggle": {
					"font-family": "Proxima Nova!important",
					"font-weight": "bold",
					"background-color": "#fd4703",
					":hover": {
						"background-color": "#e44003"
					},
					":focus": {
						"background-color": "#e44003"
					}
				},
				"count": {
					"font-size": "14px"
				}
			},
			"googleFonts": [
				"Montserrat"
			]
		}
	};

	
	if(shopify_enabled) {
		if (window.ShopifyBuy) {
			if (window.ShopifyBuy.UI) {
				ShopifyBuyInit();
			} else {
				loadScript();
			}
		} else {
			loadScript();
		}
    }

    function loadScript() {
        var script = document.createElement('script');
        script.async = true;
        script.src = scriptURL;
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
        script.onload = ShopifyBuyInit;
    }

    function ShopifyBuyInit() {
        var client = ShopifyBuy.buildClient({
            domain: shopify_domain,
            storefrontAccessToken: shopify_access_token
        });
		
        ShopifyBuy.UI.onReady(client).then(function(ui) {
			
			jQuery(".shopify-component").each(function() { 
				ui.createComponent('product', {
					id: jQuery(this).attr("data-shopify-product-id"),
					node: jQuery(this)[0],
					moneyFormat: '%24%7B%7Bamount%7D%7D',
					options: shopify_options,
				});
			});
        });
    }
})();
/*]]>*/