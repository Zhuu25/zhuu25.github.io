var list = [];
var ans = 0;
var cor = 0;
var time = 0;
var totalTime = 0;
var number = 1000;
var down = null;
var qu = "สุนัขในภาพคือสุขนัขสายพันธุ์อะไร?";

function uniqueValue(value, index, self){
	return self.indexOf(value) === index;
}

function rand(num){
	cor = 0;
	totalTime = 0;
	list = [];
	while(list.length < num){
    	var randomnumber = Math.floor(Math.random()*27) ;
    	if(list.indexOf(randomnumber) > -1) continue;
		    list.push(randomnumber);
	}
	console.log("list: "+list);
	console.log("list length: "+list.length);
	$('.choices').hide();
	showChoice();
	setHtml();
}

function countdownTime(){
	down = setInterval(setTime, number);
}

function setTime(){
	if (time < 0){
		clearInterval(down);
		time = 10;
		check(4);
	}
	else{
		document.getElementById("timer").textContent = time--;
	}
}

function check(id){
	clearInterval(down);
	if (time != 10){
		totalTime += (10-time);
		console.log(10-time+" sec/quiz");
	}
	else{
		totalTime += 10;
	}
	document.getElementById("timer").textContent = 10;
	if (id == ans){
		cor++;
		console.log("Answer correct");
	}
	else{
		console.log("Answer false");
	}
	list.pop(list[list.length]);
	if (list.length == 0){
		finish();
	}
	else{
		setHtml();
	}
}

function finish(){
	$('.quiz').hide();
	$('#dog').hide();
	$('#0').hide();
	$('#1').hide();
	$('#2').hide();
	$('#3').hide();
	$('#timer').hide();

	$('.score').html(cor);
	$('.ti').html(totalTime+" วินาที");

	$('.finish').show();
}

function restart(){
	$('.finish').hide();

	$('#dog').attr('src', "https://acimg.auctivacommerce.com/imgdata/0/3/3/5/1/0/webimg/6408453.jpg");
	$('.output').show();
	$('#dog').show();
	$('.choices').show();
}

function showChoice(){
	$('#timer').show();
	$('.quiz').show();
	$('#0').show();
	$('#1').show();
	$('#2').show();
	$('#3').show();
}

function setHtml(){
	time = 9;
	countdownTime();
	var po = list.length-1;
	$(document).ready(function(){
		$.ajax({
			url: 'data.json',
			method: 'GET',
			dataType: 'json',
			success: function(response){
				console.log(response[list[po]]);
				ans = response[list[po]]['ans'];
				$('.output').hide();
				var res = response[list[po]]['quiz'];
				if (res == 'hide'){
					$('#dog').hide();
					$('.quiz').html(response[list[po]]['quiz2']);
				}
				else{
					$('.quiz').html(qu);
					$('#dog').show();
					$('#dog').attr('src', response[list[po]]['quiz']);
				}
				$('#0').html(response[list[po]]['choice'][0]);
				$('#1').html(response[list[po]]['choice'][1]);
				$('#2').html(response[list[po]]['choice'][2]);
				$('#3').html(response[list[po]]['choice'][3])
				
			},
			error: function (event,xhr,options,exc) {
       	    	console.log(event);
        	   	console.log(xhr);
        	   	console.log(options);
         	  	console.log(exc);
       	 	}
		});
	});
}