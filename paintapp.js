
if (window.addEventListener) {
	window
			.addEventListener(
					'load',
					function() {
						var canvas, context, canvaso, contexto;

						// The active tool instance.
						var tool;
						var tool_default = 'line';
						
						function init() {
							// Find the canvas element.
							canvaso = document.getElementById('imageView');
							if (!canvaso) {
								alert('Error: I cannot find the canvas element!');
								return;
							}

							if (!canvaso.getContext) {
								alert('Error: no canvas.getContext!');
								return;
							}

							// Get the 2D canvas context.
							contexto = canvaso.getContext('2d');
							if (!contexto) {
								alert('Error: failed to getContext!');
								return;
							}

							// Add the temporary canvas.
							var container = canvaso.parentNode;
							canvas = document.createElement('canvas');
							if (!canvas) {
								alert('Error: I cannot create a new canvas element!');
								return;
							}

							canvas.id = 'imageTemp';
							canvas.width = canvaso.width;
							canvas.height = canvaso.height;
							container.appendChild(canvas);

							context = canvas.getContext('2d');

							// Get the tool select input.
							///////////////////////////////
							var tool_select = document.getElementById('dtool');
							
							if (!tool_select) {
								alert('Error: failed to get the dtool element!');
								return;
							}
							tool_select.addEventListener('change',
									ev_tool_change, false);
							$(document).on('click', '#line', function() {
								ev_tool_change('line');
							});
							$(document).on('click', '#rect', function() {
								ev_tool_change('rect');
							});
							$(document).on('click', '#pencil', function() {
								ev_tool_change('pencil');
							});
							$(document).on('click', '#circle', function() {
								ev_tool_change('circle');
							});
							$(document).on('click', '#erase', function() {
								ev_tool_change('erase');
							});
							
							$(document).on('click', '#black', function() {
								$('#selColor').val('black');
							});
							$(document).on('click', '#blue', function() {
								$('#selColor').val('blue');
							});
							$(document).on('click', '#red', function() {
								$('#selColor').val('red');
							});
							$(document).on('click', '#green', function() {
								$('#selColor').val('green');
							});
							$(document).on('click', '#yellow', function() {
								$('#selColor').val('yellow');
							});
							$(document).on('click', '#gray', function() {
								$('#selColor').val('gray');
							});
							$(document).on('click', '#orange', function() {
								$('#selColor').val('orange');
							});
							$(document).on('click', '#brown', function() {
								$('#selColor').val('brown');
							});
							$(document).on('click', '#cyan', function() {
								$('#selColor').val('cyan');
							});
							$(document).on('click', '#indigo', function() {
								$('#selColor').val('indigo');
							});
							$(document).on('click', '#khaki', function() {
								$('#selColor').val('khaki');
							});
							$(document).on('click', '#white', function() {
								$('#selColor').val('white');
							});
							$(document).on('click', '#pink', function() {
								$('#selColor').val('pink');
							});
							$(document).on('click', '#purple', function() {
								$('#selColor').val('purple');
							});
							$(document).on('click', '#maroon', function() {
								$('#selColor').val('maroon');
							});
							$(document).on('click', '#magenta', function() {
								$('#selColor').val('magenta');
							});
							$(document).on('click', '#chocolate', function() {
								$('#selColor').val('chocolate');
							});
							$(document).on('click', '#olive', function() {
								$('#selColor').val('olive');
							});
							
							
							$(document).on('click', '#1', function() {
								$('#selWidth').val('1');
							});
							$(document).on('click', '#3', function() {
								$('#selWidth').val('3');
							});
							$(document).on('click', '#5', function() {
								$('#selWidth').val('5');
							});
							$(document).on('click', '#7', function() {
								$('#selWidth').val('7');
							});
							$(document).on('click', '#9', function() {
								$('#selWidth').val('9');
							});
							$(document).on('click', '#11', function() {
								$('#selWidth').val('11');
							});
							$(document).on('click', '#16', function() {
								$('#selWidth').val('16');
							});
							// Activate the default tool.
							if (tools[tool_default]) {
								tool = new tools[tool_default]();
								tool_select.value = tool_default;
							}

							// Attach the mousedown, mousemove and mouseup event
							// listeners.
							canvas.addEventListener('mousedown', ev_canvas,
									false);
							canvas.addEventListener('mousemove', ev_canvas,
									false);
							canvas
									.addEventListener('mouseup', ev_canvas,
											false);
						}

						// The general-purpose event handler. This function just
						// determines the mouse
						// position relative to the canvas element.
						function ev_canvas(ev) {
							if (ev.layerX || ev.layerX == 0) { // Firefox
								ev._x = ev.layerX;
								ev._y = ev.layerY;
							} else if (ev.offsetX || ev.offsetX == 0) { // Opera
								ev._x = ev.offsetX;
								ev._y = ev.offsetY;
							}

							// Call the event handler of the tool.
							var func = tool[ev.type];
							if (func) {
								func(ev);
							}
						}

						// The event handler for any changes made to the tool
						// selector.
						function ev_tool_change(ev) {
							console.log(ev);
							 
							if (tools[ev]) {
								tool = new tools[ev]();
							}
							else if (tools[this.value]) {
								tool = new tools[this.value]();
							}
						}

						// This function draws the #imageTemp canvas on top of
						// #imageView, after which
						// #imageTemp is cleared. This function is called each
						// time when the user
						// completes a drawing operation.
						function img_update() {
							contexto.drawImage(canvas, 0, 0);
							context
									.clearRect(0, 0, canvas.width,
											canvas.height);
						}

						// This object holds the implementation of each drawing
						// tool.
						var tools = {};

						// The drawing pencil.
						tools.pencil = function() {

							var tool = this;
							this.started = false;

							// This is called when you start holding down the
							// mouse button.
							// This starts the pencil drawing.
							this.mousedown = function(ev) {
								context.beginPath();
								context.moveTo(ev._x, ev._y);
								tool.started = true;
							};

							// This function is called every time you move the
							// mouse. Obviously, it only
							// draws if the tool.started state is set to true
							// (when you are holding down
							// the mouse button).
							this.mousemove = function(ev) {
								if (tool.started) {
									context.lineTo(ev._x, ev._y);
									context.lineWidth = $('#selWidth').val(); 
									context.lineJoin = 'round';
									context.lineCap = 'round';
									context.strokeStyle = $('#selColor').val();
									context.stroke();
								}
							};

							// This is called when you release the mouse button.
							this.mouseup = function(ev) {
								if (tool.started) {
									tool.mousemove(ev);
									tool.started = false;
									img_update();
								}
							};
						};

						// The rectangle tool.
						tools.rect = function() {
							
							var tool = this;
							this.started = false;

							this.mousedown = function(ev) {
								tool.started = true;
								tool.x0 = ev._x;
								tool.y0 = ev._y;
							};

							this.mousemove = function(ev) {
								if (!tool.started) {
									return;
								}

								var x = Math.min(ev._x, tool.x0), y = Math.min(
										ev._y, tool.y0), w = Math.abs(ev._x
										- tool.x0), h = Math.abs(ev._y
										- tool.y0);

								context.clearRect(0, 0, canvas.width,
										canvas.height);

								if (!w || !h) {
									return;
								}

								context.beginPath();
								context.strokeRect(x, y, w, h);
								context.lineWidth = $('#selWidth').val();
								context.lineJoin = 'round';
								context.lineCap = 'round';
								context.strokeStyle = $('#selColor').val();
								context.stroke();
								context.closePath();
							};

							this.mouseup = function(ev) {
								if (tool.started) {
									tool.mousemove(ev);
									tool.started = false;
									img_update();
								}
							};
						};

						// The line tool.
						tools.line = function() {
							var tool = this;
							this.started = false;

							this.mousedown = function(ev) {
								tool.started = true;
								tool.x0 = ev._x;
								tool.y0 = ev._y;
							};

							this.mousemove = function(ev) {
								if (!tool.started) {
									return;
								}

								context.clearRect(0, 0, canvas.width,
										canvas.height);

								context.beginPath();
								context.moveTo(tool.x0, tool.y0);
								context.lineTo(ev._x, ev._y);
								context.lineWidth = $('#selWidth').val();
								context.lineJoin = 'round';
								context.lineCap = 'round';
								context.strokeStyle = $('#selColor').val();
								context.stroke();
								context.closePath();
							};

							this.mouseup = function(ev) {
								if (tool.started) {
									tool.mousemove(ev);
									tool.started = false;
									img_update();
								}
							};
						};

						// The circle tool.
						tools.circle = function() {
							var tool = this;
							this.started = false;

							this.mousedown = function(ev) {
								tool.started = true;
								tool.x0 = ev._x;
								tool.y0 = ev._y;
							};

							this.mousemove = function(ev) {
								if (!tool.started) {
									return;
								}

								var x = (ev._x + tool.x0) / 2;
								var y = (ev._y + tool.y0) / 2;

								var radius = Math.max(
										Math.abs(ev._x - tool.x0), Math
												.abs(ev._y - tool.y0)) / 2;

								context.clearRect(0, 0, canvas.width,
										canvas.height);

								// context.strokeRect(x, y);

								context.beginPath();
								context
										.arc(x, y, radius, 0, Math.PI * 2,
												false);
								// context.arc(x, y, 5, 0, Math.PI*2, false);
								context.lineWidth = $('#selWidth').val();
								context.lineJoin = 'round';
								context.lineCap = 'round';
								context.strokeStyle = $('#selColor').val();
								context.stroke();
								context.closePath();

							};

							this.mouseup = function(ev) {
								if (tool.started) {
									tool.mousemove(ev);
									tool.started = false;
									img_update();
								}
							};
						};


						// The erase tool.
						tools.erase = function() {

							var tool = this;
							this.started = false;

							// This is called when you start holding down the
							// mouse button.
							// This starts the pencil drawing.
							this.mousedown = function(ev) {
								context.beginPath();
								context.moveTo(ev._x, ev._y);
								tool.started = true;
							};

							// This function is called every time you move the
							// mouse. Obviously, it only
							// draws if the tool.started state is set to true
							// (when you are holding down
							// the mouse button).
							this.mousemove = function(ev) {
								if (tool.started) {
									context.lineTo(ev._x, ev._y);
									context.strokeStyle = 'rgb(255, 255, 255)';
									context.globalCompositeOperation = 'copy';
									context.fillStyle = 'rgba(255,0,0,0)';
									context.strokeStyle = "rgba(255,255,255,255)";
									context.lineWidth = $('#eraseWidth').val();
									context.stroke();
								}
							};

							// This is called when you release the mouse button.
							this.mouseup = function(ev) {
								if (tool.started) {
									tool.mousemove(ev);
									tool.started = false;
									img_update();
								}
							};
						};

						
						init();
					}, false);
					
					function clearCan() {
							var c = document.getElementById("imageView");
							var ctx = c.getContext("2d");
							ctx.clearRect(0, 0, 1000, 600);	
						}
						
					function imgBackRed() {
			document.getElementById('imageView').style.backgroundColor = "red";
		}
	
		function imgBackWhite() {
			document.getElementById('imageView').style.backgroundColor = "white";
		}
}

function imgBackBlue() {
			document.getElementById('imageView').style.backgroundColor = "blue";
		}
		
		function imgBackGreen() {
			document.getElementById('imageView').style.backgroundColor = "green";
		}
		
		function imgBackBlack() {
			document.getElementById('imageView').style.backgroundColor = "black";
		}

