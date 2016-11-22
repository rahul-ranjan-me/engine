define([], 
	function(
	) {
	    
	    return function(){
	    	
			Highcharts.theme = {
			   colors: ["#328f8a", "#08ac4b", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
			      "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
			   chart: {
			      backgroundColor: {
			         linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
			         stops: [
			            [0, '#2f2f2f']
			         ]
			      },
			      style: {
			         fontFamily: "'Unica One', sans-serif"
			      },
			      plotBorderColor: '#606063'
			   },
			   title: {
			      style: {
			         color: '#E0E0E3',
			         textTransform: 'uppercase',
			         fontSize: '20px'
			      }
			   },
			   subtitle: {
			      style: {
			         color: '#E0E0E3',
			         textTransform: 'uppercase'
			      }
			   },
			   xAxis: {
			      gridLineColor: '#707073',
			      labels: {
			         style: {
			            color: '#E0E0E3'
			         }
			      },
			      lineColor: '#707073',
			      minorGridLineColor: '#505053',
			      tickColor: '#707073',
			      title: {
			         style: {
			            color: '#A0A0A3'

			         }
			      }
			   },
			   yAxis: {
			      gridLineColor: '#707073',
			      labels: {
			         style: {
			            color: '#E0E0E3'
			         }
			      },
			      lineColor: '#707073',
			      minorGridLineColor: '#505053',
			      tickColor: '#707073',
			      tickWidth: 1,
			      title: {
			         style: {
			            color: '#A0A0A3'
			         }
			      }
			   },
			   tooltip: {
			      backgroundColor: 'rgba(0, 0, 0, 0.85)',
			      style: {
			         color: '#F0F0F0'
			      }
			   },
			   plotOptions: {
			      series: {
			         dataLabels: {
			            color: '#B0B0B3'
			         },
			         marker: {
			            lineColor: '#333'
			         }
			      },
			      boxplot: {
			         fillColor: '#505053'
			      },
			      candlestick: {
			         lineColor: 'white'
			      },
			      errorbar: {
			         color: 'white'
			      }
			   },
			   legend: {
			      itemStyle: {
			         color: '#E0E0E3'
			      },
			      itemHoverStyle: {
			         color: '#FFF'
			      },
			      itemHiddenStyle: {
			         color: '#606063'
			      }
			   },
			   credits: {
			      style: {
			         color: '#666'
			      }
			   },
			   labels: {
			      style: {
			         color: '#707073'
			      }
			   },

			   drilldown: {
			      activeAxisLabelStyle: {
			         color: '#F0F0F3'
			      },
			      activeDataLabelStyle: {
			         color: '#F0F0F3'
			      }
			   },

			   navigation: {
			      buttonOptions: {
			         symbolStroke: '#DDDDDD',
			         theme: {
			            fill: '#505053'
			         }
			      }
			   },

			   // scroll charts
			   rangeSelector: {
			      buttonTheme: {
			         fill: '#505053',
			         stroke: '#000000',
			         style: {
			            color: '#CCC'
			         },
			         states: {
			            hover: {
			               fill: '#707073',
			               stroke: '#000000',
			               style: {
			                  color: 'white'
			               }
			            },
			            select: {
			               fill: '#000003',
			               stroke: '#000000',
			               style: {
			                  color: 'white'
			               }
			            }
			         }
			      },
			      inputBoxBorderColor: '#505053',
			      inputStyle: {
			         backgroundColor: '#333',
			         color: 'silver'
			      },
			      labelStyle: {
			         color: 'silver'
			      }
			   },

			   navigator: {
			      handles: {
			         backgroundColor: '#666',
			         borderColor: '#AAA'
			      },
			      outlineColor: '#CCC',
			      maskFill: 'rgba(255,255,255,0.1)',
			      series: {
			         color: '#7798BF',
			         lineColor: '#A6C7ED'
			      },
			      xAxis: {
			         gridLineColor: '#505053'
			      }
			   },

			   scrollbar: {
			      barBackgroundColor: '#808083',
			      barBorderColor: '#808083',
			      buttonArrowColor: '#CCC',
			      buttonBackgroundColor: '#606063',
			      buttonBorderColor: '#606063',
			      rifleColor: '#FFF',
			      trackBackgroundColor: '#404043',
			      trackBorderColor: '#404043'
			   },

			   // special colors for some of the
			   legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
			   background2: '#505053',
			   dataLabelsColor: '#B0B0B3',
			   textColor: '#C0C0C0',
			   contrastTextColor: '#F0F0F3',
			   maskColor: 'rgba(255,255,255,0.3)'
			};

			// Apply the theme
			Highcharts.setOptions(Highcharts.theme);


	    	var chartFactory = {};

	    	chartFactory.barChart = function(data, callback){
	    		
	    		var chart = Highcharts.chart(data.container, {
					chart: {
			            type: 'bar'
			        },
			        title: {
			            text: data.title
			        },
			        subtitle: {
			            text: data.subTitile
			        },
			        xAxis: {
			            categories: data.categories,
			            title: {
			                text: null
			            }
			        },
			        yAxis: {
			            min: 0,
			            title: {
			                text: data.yAxisText,
			                align: 'high'
			            },
			            labels: {
			                overflow: 'justify'
			            }
			        },
			        tooltip: {
			            valueSuffix: data.tooltip
			        },
			        plotOptions: {
			            bar: {
			            	allowPointSelect: true,
		            	    states: {
			                    select: {
			                    	borderColor: '#ffffff',
			                        color: '#decf07'
			                    }
			                },
				            dataLabels: {
			                    enabled: true
			                },
			                events: {
			                	click: function(e){
			                		chart.series[0].data[0].graphic.attr({fill: '#328f8a'});
			                		chart.series[0].data[0].color = '#328f8a';
			                		delete chart.series[0].data[0].options.color;
			                		chart.series[0].redraw();
			                		if(callback){
			                			callback(e.point.category, chart);
			                		}
			                	}
			                }
			            }
			        },
			        legend: {
			            enabled: false
			        },
			        credits: {
			            enabled: false
			        },
			        series: data.series,
			        exporting: false
				});
	    	};

	    	var chartPurchaseHistory;
	    	chartFactory.bubbleChart = function(data, replace){
	    		if(!replace){
	    			chartPurchaseHistory = Highcharts.chart('purchaseHistory', {
						chart: {
				            type: 'bubble',
				            zoomType: 'xy'
				        },

				        legend: {
				            enabled: false
				        },

				        title: {
				            text: ' '
				        },

				        subtitle: {
				            text: ' '
				        },

				        xAxis: {
				            gridLineWidth: 1,
				            title: {
				                text: 'Year'
				            },
				            labels: {
				                format: '{value}'
				            }
				        },

				        yAxis: {
				            startOnTick: false,
				            endOnTick: false,
				            title: {
				                text: 'Month'
				            },
				            labels: {
				                format: '{value}'
				            },
				            maxPadding: 0.2			            
				        },

				        tooltip: {
				            useHTML: true,
				            headerFormat: '',
				            pointFormat: '<span style="font-weight:bold; color:#08ac4b; display:block;">Product Family: </span>{point.productFamily}<br><br>' +
				                '<span style="font-weight:bold; color:#08ac4b;">Year: </span>{point.x}<br><br>' +
				                '<span style="font-weight:bold; color:#08ac4b;">Month: </span>{point.y}<br>'			            
				        },

				        plotOptions: {
				            series: {
				                dataLabels: {
				                    enabled: true,
				                    format: '{point.productFamily}'
				                }
				            }
				        },

				        series: [{
				            data: data
				        }],
				        exporting: false
					});
	    		}else{
	    			chartPurchaseHistory.series[0].remove();
	    			chartPurchaseHistory.addSeries({
						data:data
					});
	    		}

	    		function getMonth(val){
	    			return val;
	    		}

	    		
	    	};

	    	chartFactory.columnDrilldown = function(chartData){

	    		function setChart(data, isReplace, categories, accountName) {
	    			var dataLen = data.length;

					chart.series[0].remove();
									
					if(dataLen === 1){
						chart.series[0].remove();
					} else {
						for(var i = 0; i< chart.series.length; i++){
					   		chart.series[i].remove();
						}
					}
					if(isReplace){
						chart.addSeries({
							name: 'Account Name',
			            	colorByPoint: true,
							data:data
						});
						chart.xAxis[0].setCategories(null);
						chart.yAxis[0].setTitle({text : chartData.yAxisText});
						chart.setTitle({text : chartData.title});
						chart.setTitle(null, {text : chartData.subTitle});
					}else{
						for(var z = 0; z< dataLen; z++){
							chart.addSeries(data[z]);
							chart.series[z].update({
							    tooltip:{
							    	headerFormat: '',
							        pointFormat: '<span style="color:{point.color}">{series.name}: </span><b>{point.y:.2f}%</b><br/>'
							    }
							});
						}
						chart.xAxis[0].setCategories(categories);
						chart.yAxis[0].setTitle({text : chartData.yAxisDrillTitle});
						chart.setTitle({text : chartData.drillTitle+' '+accountName});
						chart.setTitle(null, {text : chartData.drillSubTitle});
					}
					
				}

	    		
	    		var chart = Highcharts.chart(chartData.container, {
					
					chart: {
			            type: 'column'
			        },
			        title: {
			            text: chartData.title
			        },
			        subtitle: {
			            text: chartData.subTitle
			        },
			        xAxis: {
			            type: 'category'
			        },
			        yAxis: {
			        	min: 0,
			            title: {
			                 text: chartData.yAxisText
			            },
			            stackLabels: {
				            enabled: false,
				            style: {
				                fontWeight: 'bold',
				                color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
				            }
				        }
			        },
			        legend: {
				        align: 'right',
				        x: -30,
				        verticalAlign: 'top',
				        y: 25,
				        floating: true,
				        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
				        borderColor: '#CCC',
				        borderWidth: 1,
				        shadow: false
				    },
			        plotOptions: {
			            column: {
			                dataLabels: {
			                    enabled: true,
			                   	style: {
			                        textShadow: '0 0 3px black',
			                    }
			                },
			                events: {
			                	click: function(e){
			                		if(e.point.options.drilldown){
			                			setChart(e.point.options.drilldown, false, e.point.options.opportunityName, e.point.options.name);
			                		}else{
			                			setChart(chartData.data, true);
			                		}
			                	}
			                }
			            }
			            
			        },

			        tooltip: {
			            headerFormat: '',
			            pointFormat: '<span style="color:{point.color}">{point.name}</span><br><b>Total leads:</b> {point.y}<br>'
			        },

			        series: [{
			        	name: 'Client Name',
			        	colorByPoint: true,
			        	data : chartData.data
			        }],
			        exporting: false
	    			
			    });
			};

			chartFactory.donut = function(chartData, callback){
				var chart = Highcharts.chart(chartData.container, {
					chart: {
			            type: 'pie',
			            options3d: {
			                enabled: true,
			                alpha: 45
			            }
			        },
			        title: {
			            text: chartData.title
			        },
			        subtitle: {
			            text: chartData.subtitle
			        },
			        plotOptions: {
			            pie: {
			                innerSize: 100,
			                depth: 45,
			                events: {
			                	click: function(e){
			                		callback(e.point.name, chart);
			                	}
			                }
			            }
			        },
			        series: [{
			            name: chartData.seriesName,
			            data: chartData.data
			        }],
			        exporting: false
				});
			};

			chartFactory.pie = function(chartData, callback){
				var chart = Highcharts.chart(chartData.container, {
					chart: {
			            plotBackgroundColor: null,
			            plotBorderWidth: null,
			            plotShadow: false,
			            type: 'pie'
			        },
			        title: {
			            text: chartData.title
			        },
			        subtitle: {
			            text: chartData.subtitle
			        },
			        tooltip: {
			            pointFormat: '{series.name}: <b>{point.y}</b>'
			        },
			        plotOptions: {
			            pie: {
			                allowPointSelect: true,
			                cursor: 'pointer',
			                dataLabels: {
			                    enabled: true,
			                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
			                    style: {
			                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
			                    }
			                },
			                events: {
			                	click: function(e){
			                		callback(e.point.name, chart);
			                	}
			                }
			            }
			        },
			        series: [{
			            name: chartData.seriesName,
			            colorByPoint: true,
			            data: chartData.data
			        }],
			        exporting: false
				});
			};

			chartFactory.column = function(chartData, callback){
				var chart = Highcharts.chart(chartData.container, {
					
					chart: {
			            type: 'column'
			        },
			        title: {
			            text: chartData.title
			        },
			        subtitle: {
			            text: chartData.subtitle
			        },
			        xAxis: {
			            categories: chartData.categories,
			            crosshair: true
			        },
			        yAxis: {
			            min: 0,
			            title: {
			                text: 'Clients'
			            }
			        },
			        legend: {
				        enabled: false
				    },
			        tooltip: {
			            headerFormat: '<span style="font-size:11px">{point.key}</span><br>',
			            pointFormat: '<span style="font-size:10px">Total clients: </span><b style="font-size:10px">{point.y}<br>',
			            useHTML: true
			        },
			        plotOptions: {
			            column: {
			                pointPadding: 0.2,
			                borderWidth: 0,
			                events: {
			                	click: function(e){
			                		callback(e, chart);
			                	}
			                }
			            }
			        },
			        series: [{
			            name: 'Product Data',
			            data: chartData.data

			        }],
			        exporting: false

				});
			};

			var chartNewBusiness;
			chartFactory.lineBusiness = function(chartData, replace){
				
				if(!replace){
					chartNewBusiness = Highcharts.chart(chartData.container, {
						
						chart: {
				            type: 'line'
				        },
				        title: {
				        	useHTML: true,
				            text: chartData.title
				        },
				        subtitle: {
				            text: chartData.subtitle
				        },
				        xAxis: {
				            categories: chartData.categories
				        },
				        yAxis: {
				        	min: 0,
				        	max: 750,
				            title: {
				                text: 'Clients'
				            }
				        },
				        tooltip: {
				            headerFormat: '<span style="font-size:11px">{point.key}</span><br>',
				            pointFormat: '<span style="font-size:10px">Total clients: </span><b style="font-size:10px">{point.y}<br>',
				            useHTML: true
				        },
				        series: [{
				            name: 'Year',
				            data: chartData.data

				        }],
				        exporting: false

					});
				}else{
					chartNewBusiness.xAxis[0].setCategories(chartData.categories);
					chartNewBusiness.series[0].remove();
					chartNewBusiness.addSeries({
						name: 'Year',
						data:chartData.data
					});
					chartNewBusiness.setTitle({text: chartData.title});
				}
			};

			var chartRenewalTrends;
			chartFactory.lineRenwal = function(chartData, replace){
				if(!replace){
					chartRenewalTrends = Highcharts.chart(chartData.container, {
						
						chart: {
							type: 'line'
				        },
				        title: {
				        	useHTML: true,
				            text: chartData.title
				        },
				        subtitle: {
				            text: chartData.subtitle
				        },
				        xAxis: {
				            categories: chartData.categories
				        },
				        yAxis: {
				            title: {
				                text: 'Clients'
				            }
				        },
				        tooltip: {
				            headerFormat: '<span style="font-size:11px">{point.key}</span><br>',
				            pointFormat: '<span style="font-size:10px">Total clients: </span><b style="font-size:10px">{point.y}<br>',
				            useHTML: true
				        },
				        series: [{
				            name: 'Year',
				            data: chartData.data

				        }],
				        exporting: false

					});
				}else{
					chartRenewalTrends.xAxis[0].setCategories(chartData.categories);
					chartRenewalTrends.series[0].remove();
					chartRenewalTrends.addSeries({
						name: 'Year',
						data:chartData.data
					});
					chartRenewalTrends.setTitle({text: chartData.title});
				}
			};

	    	return chartFactory;
	    };	

	}
);