//
// Validate Handler
// Using Chain of Responsibility Pattern
//

mm.Class('ValidateHandler',{
	init: function(){
		this._next_handler = null;
	},
	setNext: function(handler){	//ValidateHandler handler
		this._next_handler = handler;
		return this;
	},
	getNextHandler:function(){
		return this._next_handler;
	},
	validate: function(input){
		var result = this.execValidate(input);

		if( result ){
			return this.getErrorMessage();
		} else if( this.getNextHandler() !== null ){
			return this.getNextHandler().validate(input);
		} else {
			return true;
		}
	},
	execValidate: function(){		//abstruct
	},
	getErrorMessage: function(){	//abstruct
	}
});


// Number Validate
mm.Class('NumberValidateHandler:ValidateHandler' ,{
	execValidate: function(input){
		return isNaN(Number(input));
	},
	getErrorMessage: function(){
		return '数値を入力してください';
	}
});


// Effort Range Validate
mm.Class('EffortRangeValidateHandler:ValidateHandler' ,{
	execValidate: function(input){
		return ( input < 0 || input > 252 );
	},
	getErrorMessage: function(){
		return '努力値は0～252の範囲で入力してください';
	}
});

// Level Range Validate
mm.Class('LevelRangeValidateHandler:ValidateHandler',{
	execValidate: function(input){
		return ( input < 1 || input > 100 );
	},
	getErrorMessage: function(){
		return 'LVは1～100の範囲で入力してください';
	}
});


// Effort Total Validate
mm.Class('EffortTotalValidateHandler:ValidateHandler',{
	execValidate: function(input){
		return ( input  > 508 );
	},
	getErrorMessage: function(){
		return '努力値の合計が508以下になるように入力してください';
	}
});

// Multiple Validate
mm.Class('MultipleValidateHandler:ValidateHandler' ,{
	execValidate: function(input){
		return ( input & 0x03 );
	},
	getErrorMessage: function(){
		return '努力値が4の倍数になっていません';
	}
});


// Blank Valida
mm.Class('BlankValidateHandler:ValidateHandler', {
	execValidate: function(input){
		return ( input === '' );
	},
	getErrorMessage: function(){
		return '入力が正しくありません';
	}
});

// Undefined Valida
mm.Class('UndefinedValidateHandler:ValidateHandler', {
	execValidate: function(input){
		return ( typeof input === 'undefined' );
	},
	getErrorMessage: function(){
		return '入力が正しくありません';
	}
});
