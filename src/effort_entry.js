//
// Entry Point
//
function PageInit(){

	// Personality
	new mm.DOMPersonalityList();

	// Suggest
	new mm.DOMSuggest();

	// Calculate
	new mm.DOMEfforCalc();

}


if( typeof document.addEventListener === "function" ){
	document.addEventListener('DOMContentLoaded', function(){ PageInit() }, false );
}else{
	alert('Your browser is too old!!! Not supprot.');
}
