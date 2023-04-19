ScrollReveal().reveal( '.headline' );

var a = 0;
$( window ).scroll( function () {
  var oTop = $( '#counter' ).offset().top - window.innerHeight;
  if ( a == 0 && $( window ).scrollTop() > oTop ) {
    $( '.counter-value' ).each( function () {
      var $this = $( this ),
        countTo = $this.attr( 'data-count' );
      $( {
        countNum: $this.text()
      } ).animate( { countNum: countTo },
        {
          duration: 2000,
          easing: 'swing',
          step: function () { $this.text( Math.floor( this.countNum ) ); },
          complete: function () { $this.text( this.countNum ); }
        } );
    } );
    a = 1;
  }
} );

// IMAGE SLIDES & CIRCLES ARRAYS, & COUNTER
var imageSlides = document.getElementsByClassName( 'imageSlides' );
var circles = document.getElementsByClassName( 'circle' );
var leftArrow = document.getElementById( 'leftArrow' );
var rightArrow = document.getElementById( 'rightArrow' );
var counter = 0;

// HIDE ALL IMAGES FUNCTION
function hideImages () {
  for ( var i = 0;i < imageSlides.length;i++ ) imageSlides[ i ].classList.remove( 'visible' );
}

// REMOVE ALL DOTS FUNCTION
function removeDots () {
  for ( var i = 0;i < imageSlides.length;i++ ) circles[ i ].classList.remove( 'dot' );
}

// SINGLE IMAGE LOOP/CIRCLES FUNCTION
function imageLoop () {
  imageSlides[ counter ].classList.add( 'visible' );
  removeDots();
  circles[ counter ].classList.add( 'dot' );
  counter++;
}

// LEFT & RIGHT ARROW FUNCTION & CLICK EVENT LISTENERS
function arrowClick ( e ) {
  var target = e.target;
  if ( target == leftArrow ) {
    clearInterval( imageSlideshowInterval );
    hideImages();
    removeDots();

    if ( counter == 1 ) counter = ( imageSlides.length - 1 );
    else counter -= 2

    imageLoop();
    imageSlideshowInterval = setInterval( slideshow, 10000 );
  }
  else if ( target == rightArrow ) {
    clearInterval( imageSlideshowInterval );
    hideImages();
    removeDots();

    if ( counter == imageSlides.length ) counter = 0;

    imageLoop();
    imageSlideshowInterval = setInterval( slideshow, 10000 );
  }
}

leftArrow.addEventListener( 'click', arrowClick );
rightArrow.addEventListener( 'click', arrowClick );

// IMAGE SLIDE FUNCTION
function slideshow () {
  if ( counter >= imageSlides.length ) {
    counter = 0;
    hideImages();
  }
  imageLoop();
}

// SHOW FIRST IMAGE, & THEN SET & CALL SLIDE INTERVAL
setTimeout( slideshow, 1000 );
var imageSlideshowInterval = setInterval( slideshow, 10000 );
