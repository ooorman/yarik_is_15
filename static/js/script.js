function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
function isUniqueCombination(arr1, arr2) {
    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return true;
        }
    }
    return false;
}
$(document).ready(function() {
    graph = $('#graph')[0];
    context = graph.getContext('2d');

    money = 100000;
    CoinCosts = [5000];
    chart = null;
    pauseMode = false;

    function createLineChart() {
        gradient = context.createLinearGradient(0, 0, 0, window.screen.width/2);
        gradient.addColorStop(0, 'rgba(74, 169, 230, 0.8)')
        gradient.addColorStop(1, 'rgba(74, 169, 230, 0.001)')
        labels = [];
        for (i=1;i<51;i++) {
            labels.push(`${i} июня`);
        }
        data = {
            labels:labels,
            datasets: [{
                label: 'Global Price of Shitcoin',
                pointStyle: false,
                fill:true,
                backgroundColor: gradient,
                borderWidth:2,
                borderColor:'rgba(74, 169, 230, 1)',
                tension: 0.2,

                data: CoinCosts.slice(0, 50),
            }]
        }
        xScaleConfig = {
            min: 0,
            max: 50,
            ticks: {
                display:false,
            },
            border: {
                color: 'rgba(74, 169, 230, 1)'
            },
            grid: {
                color: 'rgba(74, 169, 230, 0.1)'
            }
        }
        yScaleConfig = {
            ticks: {
                autoSkip: true,
                maxRotation: 0,
                color: 'rgba(74, 169, 230, 0.9)'
            },
            border: {
                color: 'rgba(74, 169, 230, 1)'
            },
            grid: {
                color: 'rgba(74, 169, 230, 0.1)'
            }
        }
        config = {
            type: 'line',
            data: data,
            options: {
                scales: {
                    x: xScaleConfig,
                    y: yScaleConfig,
                },
                plugins: {
                    legend: {
                        display: false
                    }
                },
                animation: {
                    duration:400,
                    easing:'linear'
                },
                responsive: false,
                maintainAspectRatio: true,
                showScale: false,
            }
        }
        chart = new Chart(context, config);

        i = 50;
        interval = setInterval(()=> {
            if(i > CoinCosts.length-1) {
                pauseMode = true;
                $('.direction_button').removeAttr('style');

            }
            else if(!pauseMode) {
                chart.config.data.labels.push(`${i} июня`);
                chart.config.data.datasets[0].data.push(CoinCosts[i]);

                chart.config.options.scales.x.min++;
                chart.config.options.scales.x.max++;
                chart.update();
                i++;
            }
        }, 400);
    }

    for(i=0;i<60;i++) {
        new_val = getRandomInt(80);
        if (Math.random() < 0.5) {
            new_val -= getRandomInt(40);
        }
        CoinCosts.push(CoinCosts.at(-1) + new_val);
    }
    createLineChart(CoinCosts);

    $('.direction_button').on('click', function(e) {
        is_go_up = $(e.target).attr('id') == 'go_up';
        if(pauseMode) {
            $(this).css({'transform': 'translateY(2vh)', 'box-shadow': 'none'});
            $('.direction_button').css({'cursor':'auto'});
            if(is_go_up) {
                for(j=0;j<5;j++) {
                    CoinCosts.push(CoinCosts.at(-1) - getRandomInt(150) );
                }
            } else {
                for(j=0;j<5;j++) {
                    CoinCosts.push(CoinCosts.at(-1) + getRandomInt(150) );
                }
            }
            pauseMode = false;
        }
    });
    is_axe_animating = false;
    $('#axe').on('click', function() {
        if(is_axe_animating) {
            return;
        }
        is_axe_animating = true;
        $(this).animate(
            { borderSpacing: 90 },
            {
                duration: 1000,
                step: function(now) {
                    $('#axe').css({ transform: 'rotate(' + now + 'deg)' });
                },
                easing: 'swing',
                complete: function() {
                    $('#axe').animate(
                        { borderSpacing: 0 },
                        {
                            duration: 200,
                            step: function(now) {
                                $('#axe').css({ transform: 'rotate(' + now + 'deg)' });
                            },
                            complete: function() {
                                $('#sus')[0].play();
                                $('#china').show();
                                $('#china').fadeOut(1000);
                                is_axe_animating = false;
                            }
                        }
                    );
                }
            }
        );
    });

    $('#juicewrld').on('click', function() {
        $('#juice_talk')[0].play();
    });
    $('#juice_btn_1').on('click', function() {
        $('#juicewrld').hide();
        $('#juicewrld_1').show();
        $('#nazi')[0].play();
    });
    $('#juice_btn_2').on('click', function() {
        $('#juicewrld').hide();
        $('#juicewrld_2').show();
        $('#message_juicewrld').parent().show();
        $('#message_juicewrld').text('Йо, хоуми! Не вопрос, я тебя прикрою. Бабки на кармане, всё ништяк. Держись там и не забудь, кто братву не подводит. Мир и респект, бро!');
    });
    $('#juice_btn_3').on('click', function() {
        $('#juicewrld').hide();
        $('#juicewrld_3').show();
        $('#message_juicewrld').parent().show();
        $('#message_juicewrld').html('Ща, подожди. Ещё вот тут. О, кайф! Теперь правый ботинок. Деньги? У меня есть что-то более <a target="_blank" href="https://www.youtube.com/watch?v=fVM651yTtog">ценное</a>, чем деньги');
    });
    $('.choose_btn').on('click', function() {
        $(this).css({'background':'red'});
        $('.choose_btn').css({'cursor':'auto'});
        $('.choose_btn').unbind('click');
        $('.choose_btn').removeClass("choose_btn_hover");
    });
    minion_money = 0;
    minion_step = 1;
    $('.on_hover_scale').on('mousedown mouseup', function mouseState(e) {
        if (e.type == "mousedown") {
            $(this).css({'transform': 'scale(1.0)'});
        } else {
            $(this).css({'transform': 'scale(1.2)'});
        }
    });

    $( ".on_hover_scale" ).hover(
        function() {
            $(this).css({'transform': 'scale(1.2)'});
        }, function() {
            $(this).css({'transform': 'scale(1.0)'});
        }
    );
    $('#minion').on('click', function() {
        minion_money++;
        audio = $("#slap")[0];
        audio.pause();
        audio.currentTime = 0;
        audio.play();
        $('#minion_money').html(minion_money);
        if(minion_money >= 5000 && minion_step == 1) {
            $('#minion_error').css({'color':'green'});
            $('#minion_error').text('У вас имеется 5000 миньонокоинов, чтобы продолжить вывод средств!');
            $('#minion_next_btn').attr('disabled', false);
        }
    });
    $('#minion_next_btn').on('click', function() {
        if(minion_money >= 5000 && minion_step == 1) {
            minion_step = 2;
            $('#minion_error').text('Заполните немного информации о себе. (Просто ради формальности)');
            $('#minion_error').css({'color':'black'});
            $('#minion_next_btn').attr('disabled', true);
            waiting_code = `
                <form style="display:flex;flex-direction:column;gap:2vh;margin-top:2vh;">
                    <input placeholder="Номер карты:" type="text" id="card_number" style="font-size:2.5vh;padding:1vh;border:0.2vh solid black;border-radius:1vh;">
                    <input placeholder="Срок действия (MM/YY):" type="text" id="expiry_date" style="font-size:2.5vh;padding:1vh;border:0.2vh solid black;border-radius:1vh;">
                    <input placeholder="CVV:" type="text" id="cvv" style="font-size:2.5vh;padding:1vh;border:0.2vh solid black;border-radius:1vh;">
                </form>
            `
            $('#minion_error').after(waiting_code);
            $('#minion_next_btn').on('click', function() {
                window.location.href = 'https://www.youtube.com/watch?v=909InKvfbyk';
            });
            $('#card_number, #expiry_date, #cvv').on('input', function() {
                if($('#card_number').val().length == 16 && $('#expiry_date').val().length > 4 && $('#cvv').val().length == 3) {
                    $('#minion_next_btn').attr('disabled', false);
                } else {
                    $('#minion_next_btn').attr('disabled', true);
                }
            });
        }
    });
    $('#start_velosiped').on('click', function() {
        $(this).remove();
        waiting_code = `
            <div style="font-size:2vh">W - прыжок | S - присесть | alt + F4 - безумный трюк</div>
            <div style="float:right;">
                <img id="life1" src="static/images/doshirak.jpg" style="width:5vh">
                <img id="life2" src="static/images/doshirak.jpg" style="width:5vh">
                <img id="life3" src="static/images/doshirak.jpg" style="width:5vh">
                <img id="life4" src="static/images/doshirak.jpg" style="width:5vh">
            </div>
            <img id="yarik_velosipedist" src="static/images/yarik_velosipedist.png" style="height:30vh;width:22vh;position:absolute;bottom:0;">
            <div style="position:absolute;right:-14vh;bottom:0.5vh;background:black;width:15%;height:6vh;color:red;text-align:center;line-height:6vh;font-size:2vh" id="fear1">Толерантность</div>
            <div style="position:absolute;right:-14vh;bottom:0.5vh;background:black;width:15%;height:6vh;color:red;text-align:center;line-height:6vh;font-size:2vh" id="fear2">Инициативность</div>
        `;
        $('#velosiped_game').html(waiting_code);
        jump_high = 1;
        recent_jump_high = 0;
        is_sitting = false;
        isInvinsible = false;
        lifes = 4;
        $(window).on('keydown keyup', function(e){
            if(e.type == 'keydown') {
                if((e.key === 'w' || e.key === 'ц') && jump_high == 1 && !is_sitting) {
                    interval = setInterval(function() {
                        $('#yarik_velosipedist').css({'bottom':`${jump_high + recent_jump_high }vh`});
                        if(jump_high <= -1) {
                            jump_high = 1
                            recent_jump_high = 0;
                            clearInterval(interval);
                        } else {
                            recent_jump_high += jump_high;
                            jump_high-=0.035;
                        }
                    }, 30);
                }
                if((e.key === 's' || e.key === 'ы') && jump_high == 1) {
                    is_sitting = true;
                    $('#yarik_velosipedist').css({'transform':'scale(1.0, 0.5)'});
                    $('#yarik_velosipedist').css({'bottom':'-7.5vh'});
                }
            }
            else {
                if((e.key === 's' || e.key === 'ы')) {
                    $('#yarik_velosipedist').css({'transform':'scale(1.0, 1.0)'});
                    $('#yarik_velosipedist').css({'bottom':'0vh'});
                    is_sitting = false;
                }
            }
        });

        fears = ['Общество', 'Социализация', 'Общение', 'Соц. нормы', 'Идентичность', 'Адекватность', 'Гетеро', 'Гармония', 'Солидарность'];
        currentFear1 = 0;
        fears2 = ['Конформизм', 'Традиции', 'Ожидания', 'Ответственость', 'Мероприятия', 'Этикет', 'Развитие'];
        currentFear2 = 0;
        fear1_pos = -15;
        fear1_flying = false;
        sounds = [$('#bue')[0], $('#eu')[0], $('#oh_no')[0], $('#uee')[0]];

        fear1Interval = setInterval(function() {
            fear = fears[currentFear1];
            if (fear1_pos >= 100) {
                fear1_pos = -15;
                if (currentFear1 == fears.length - 1) currentFear1 = 0;
                else currentFear1++;
                $('#fear1').html(fear);
                if (Math.random() < 0.5) {
                    $('#fear1').css({'bottom':`16vh`});
                    fear1_flying = true;
                } else {
                    $('#fear1').css({'bottom':`0.5vh`});
                    fear1_flying = false;
                }
            }
            if (((fear1_flying && fear1_pos > 70 && fear1_pos < 95 && !is_sitting) || (!fear1_flying && fear1_pos > 60 && fear1_pos < 100 && jump_high == 1)) && !isInvinsible) {
                $('#yarik_velosipedist').css({'filter':'brightness(0.6)contrast(3)hue-rotate(1deg)saturate(10)'});
                isInvinsible = true;
                lifes -= 1;
                for(i=1;i<5;i++) {
                    if($(`#life${i}`).length) {
                        $(`#life${i}`).remove();
                        break;
                    }
                }
                sounds[getRandomInt(sounds.length)].play();
                if (lifes <= 0) {
                    loose();
                }
                setTimeout(function() {
                    isInvinsible = false;
                    $('#yarik_velosipedist').css({'filter':'none'});
                }, 1500);
            }
            fear1_pos += 0.3;
            $('#fear1').css({'right':`${fear1_pos}%`});
        }, 10);
        setTimeout(function() {
            fear2_pos = -15
            fear2_flying = false;
            fear2Interval = setInterval(function() {
                fear = fears2[currentFear2];
                if (fear2_pos >= 100) {
                    fear2_pos = -15;
                    if (currentFear2 == fears2.length - 1) currentFear2 = 0;
                    else currentFear2++;
                    if (Math.random() < 0.5) {
                        $('#fear2').css({'bottom':`16vh`});
                        fear2_flying = true;
                    } else {
                        $('#fear2').css({'bottom':`0.5vh`});
                        fear2_flying = false;
                    }
                    $('#fear2').html(fear);
                }

                if (((fear2_flying && fear2_pos > 70 && fear2_pos < 95 && !is_sitting) || (!fear2_flying && fear2_pos > 60 && fear2_pos < 100 && jump_high == 1)) && !isInvinsible) {
                    $('#yarik_velosipedist').css({'filter':'brightness(0.6)contrast(3)hue-rotate(1deg)saturate(10)'});
                    isInvinsible = true;
                    setTimeout(function() {
                        isInvinsible = false;
                        $('#yarik_velosipedist').css({'filter':'none'});
                    }, 1500);
                    lifes -= 1;
                    for(i=1;i<5;i++) {
                        if($(`#life${i}`).length) {
                            $(`#life${i}`).remove();
                            break;
                        }
                    }
                    sounds[getRandomInt(sounds.length)].play();
                    if (lifes <= 0) {
                        console.log(1);
                        loose();
                    }
                }
                fear2_pos += 0.3;
                $('#fear2').css({'right':`${fear2_pos}%`});
            }, 10);
        }, 2000);
        function loose() {
            waiting_code = `
                <div style="color:red;font-size:9.1vh;margin-top:15vh;">СОЦИАЛИЗИРОВАН</div>
            `;
            $('#velosiped_game').html(waiting_code);
            clearInterval(fear1Interval);
            clearInterval(fear2Interval);
        }
    });
    $('#zakladka').on('click', function() {$('#dada')[0].play()});
    $('#krokus').on('click', function() {$('#poko')[0].play()});

    $('#burger_start').on('click', function() {
        $(this).remove();
        famine = 0;
        mind = 100;
        addMindInterval = null;
        function crazyDeath() {
            $('#burger').remove();
            $('#death')[0].play();
            $('#cola').remove();
            clearInterval(FamineInterval);
            clearInterval(MindInterval);
            $('#burger_death').html('Вы умерли от безумия!');
        }
        function famineDeath() {
            $('#burger').remove();
            $('#cola').remove();
            $('#death')[0].play();
            clearInterval(FamineInterval);
            clearInterval(MindInterval);
            $('#burger_death').html('Вы умерли от голода!');
        }
        FamineInterval = setInterval(function() {
            if (famine < 100) famine += 1;
            else {
                famineDeath();
            }
            $('#famine').html(famine);
        }, 250);
        MindInterval = setInterval(function() {
            if(mind > 0) mind -= 1;
            else {
                crazyDeath();
            }
            $('#mind').html(mind);
        }, 300);

        $('#burger').mousedown(function() {
            if (famine > 0) famine--;
            if(mind > 0) mind--;
            else {
                crazyDeath();
            }
        });
        $("#cola").mousedown(function() {
            event.preventDefault();
            addMindInterval = setInterval(function() {
                if(mind < 100) mind++;
            }, 100);
        });
        $(window).mouseup(function() {
            if(addMindInterval) clearInterval(addMindInterval);
        });
    });
    glasses = $('.glass').toArray();
    currentGlass = 0;
    flying_glasses = [];
    tries = 2;
    is_anim_going = false;
    speed = 500;
    first_time_joker = false;

    $('.glass').on('click', function() {

        if(!is_anim_going) {
            is_anim_going = true;
            if (glasses.indexOf(this) == currentGlass) {
                new_glasses = glasses.filter(item => !flying_glasses.includes(item));
                curr_glass_relative = new_glasses.indexOf(glasses[currentGlass]);
                new_glasses = new_glasses.slice(0, curr_glass_relative).concat(new_glasses.slice(curr_glass_relative + 1));
                new_glass = new_glasses[getRandomInt(new_glasses.length)];
                currentGlass = glasses.indexOf(new_glass);
                $('#circle').appendTo(new_glass);
            }
            tries -= 1;
            flying_glasses.push(this);
            $(this).animate({ bottom: '10vh' }, 1000).promise().then(function() {
                if (tries <= 0) {
                    tries = 2;

                    for(i=0;i<flying_glasses.length;i++) {
                        $(flying_glasses[i]).animate({'bottom':0}, 1000);
                    }
                    flying_glasses = [];
                    time = 1000;
                    if(first_time_joker) {
                        time = 5000;
                        first_time_joker = false;
                    }
                    setTimeout(function() {
                        IndexArray = [0, 1, 2];
                        shuffling = setInterval(function() {
                            new_glasses = [];
                            do {
                                randomArray = IndexArray.slice().sort(() => Math.random() - 0.5);
                            } while (!isUniqueCombination(randomArray, IndexArray));
                            IndexArray = randomArray;
                            currentGlass = IndexArray[currentGlass];
                            console.log(currentGlass);
                            for(i=0;i<3;i++) {
                                $(glasses[i]).animate({'left':`${15 * IndexArray[i]}vh` }, speed);
                            }

                            shuffledMas = [0,0,0];
                            for(i=0;i<3;i++) {
                                shuffledMas[IndexArray[i]] = glasses[i];
                            }
                            glasses = shuffledMas;
                        }, speed);
                        setTimeout(function() {
                            clearInterval(shuffling);
                            is_anim_going = false;
                        }, time);

                    }, 1000);
                } else {
                    is_anim_going = false;
                }
            });
        }
    });
    $('#easy_mode').on('click', function() {
        $(this).css({'background':'red','cursor':'auto'});
        $('#joker')[0].play();
        speed = 10;
        first_time_joker = true;
    });

    $('.miniburger').on('click', function miniburgerF() {
        $(this).fadeOut(1500);

        audio = $("#sonar")[0];
        audio.pause();
        audio.currentTime = 0;
        audio.play();
        for(i=0; i<2;i++) {
            var viewportWidth = $(window).width();
            var viewportHeight = $(window).height();

            // Generate random coordinates
            var randomX = Math.floor(Math.random() * (viewportWidth - 50));
            var randomY = Math.floor(Math.random() * (viewportHeight - 50));

            // Create a new block
            var $newBlock = $('<img class="miniburger" src="static/images/miniburger.png" style="position: absolute;width:13vh;cursor:pointer;z-index:6">');

            // Set the position of the block
            $newBlock.css({
                left: randomX + 'px',
                top: randomY + 'px'
            });

            // Append the block to the body
            $newBlock.on('click', miniburgerF);
            $('body').append($newBlock);
        }
    });
    $('#bitcoin_button').on('click', function() {
        $('#bitcoin')[0].play();
    });
});
