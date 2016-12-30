$(document).ready(function () {

var word1 = $('#word1'),
    word2 = $('#word2'),
    word3 = $('#word3'),
    word4 = $('#word4'),
    tl    = new TimelineMax({repeat:-1});

    tl
      .from(word1, 0.3, {y:50, autoAlpha:0, ease:Power1.easeOut, delay:5}, '-=0.15')
      .from(word2, 0.3, {y:50, autoAlpha:0, ease:Power1.easeOut}, '-=0.15')
      .from(word3, 0.3, {y:50, autoAlpha:0, ease:Power1.easeOut}, '-=0.15')
      .from(word4, 0.3, {y:50, autoAlpha:0, ease:Power1.easeOut}, '-=0.15')
      .to(word1, 0.3, {y:50, autoAlpha:0, ease:Power1.easeOut, delay:5}, '-=0.15')
      .to(word2, 0.3, {y:50, autoAlpha:0, ease:Power1.easeOut}, '-=0.15')
      .to(word3, 0.3, {y:50, autoAlpha:0, ease:Power1.easeOut}, '-=0.15')
      .to(word4, 0.3, {y:50, autoAlpha:0, ease:Power1.easeOut}, '-=0.15');





})
