(function($, window, document, undefined) {

            var pluginName = "greenStemVis",
                defaults = {
                    gravityX: 10,
                    gravityY: 10,
                    width: 1024,
                    height: 500,
                    scale: 20,
                    host: 'https://solarsunflower.herokuapp.com'
                };

            // The actual plugin constructor
            function GreenStemVis(element, options) {
                this.element = element;

                this.settings = $.extend({}, defaults, options);
                this._defaults = defaults;
                this._name = pluginName;
                this.init();
            }

            GreenStemVis.prototype = {
                init: function() {
                    console.log('init');
                    var me = this,
                        settings = me.settings,
                        $element = $(this.element),
                        $testImage = $('<img src="http://greenstemnetwork.org/img/tree-6branches.svg" width="500"></img>')
                            .appendTo($element),
                        $textContainer = $('<div></div>')
                            .appendTo($element);

                    Date.prototype.format = function(format) //author: meizz
                        {
                          var o = {
                            "M+" : this.getMonth()+1, //month
                            "d+" : this.getDate(),    //day
                            "h+" : this.getHours(),   //hour
                            "m+" : this.getMinutes(), //minute
                            "s+" : this.getSeconds(), //second
                            "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
                            "S" : this.getMilliseconds() //millisecond
                          }

                          if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
                            (this.getFullYear()+"").substr(4 - RegExp.$1.length));
                          for(var k in o)if(new RegExp("("+ k +")").test(format))
                            format = format.replace(RegExp.$1,
                              RegExp.$1.length==1 ? o[k] :
                                ("00"+ o[k]).substr((""+ o[k]).length));
                          return format;
                        };

                    $.getJSON( settings.host + "/public/summary.json", function( data ) {
                        $.each(data.readings, function( index, value ) {
                            var dateStr = new Date(value.collection_time).format("yyyy-MM-dd h:mm:ss"),
                                siteName = value.site_name,
                                statusNames = value.status_names,
                                $siteContainer = $('<div>' + siteName + '</div>'),
                                $readingsContainer = $('<table></table>'),
                                imgSrc, $readingsRow;

                            $readingsRow = $readingsContainer.append('<tr></tr>');

                            $.each(statusNames, function( index, value ) {
                                if(value == 'GREEN') {
                                    imgSrc = 'http://greenstemnetwork.org/img/leaf-green.svg';
                                }
                                else if(value == 'YELLOW') {
                                    imgSrc = 'http://greenstemnetwork.org/img/leaf-yellow.svg';
                                }
                                else if(value == 'RED') {
                                    imgSrc = 'http://greenstemnetwork.org/img/leaf-red.svg';
                                }
                                else {
                                    imgSrc = 'http://greenstemnetwork.org/img/leaf-brown.svg';
                                }
                                // $siteContainer.append('<img src="' + imgSrc + '" width="50"></img>');
                                $readingsRow.append('<td><img src="' + imgSrc + '" width="50"></img></td>');
                            });

                            $readingsContainer.append($readingsRow);
                            $siteContainer.append($readingsContainer);
                            $textContainer.append($siteContainer);
                        }); 
                    });
                }
            }


            // A really lightweight plugin wrapper around the constructor,
            // preventing against multiple instantiations
            $.fn[pluginName] = function(options) {
                this.each(function() {
                    if (!$.data(this, "plugin_" + pluginName)) {
                        $.data(this, "plugin_" + pluginName, new GreenStemVis(this, options));
                    }
                });

                // chain jQuery functions
                return this;
            };

        })(jQuery, window, document);