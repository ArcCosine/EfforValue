//
// Effort Value Calculation
//


mm.Class('EffortCalcBase', {
	// main Process
	getEffortValue: function(data){
		if( data.target === "hp" ) {
			return  (data.bv != 1) ? (Math.floor((((data.bv * 2) + data.iv + Math.floor(data.ev / 4)) * data.lv) / 100) + 10 + data.lv) : 1;
		}
		return Math.floor((Math.floor((((data.bv * 2) + data.iv + Math.floor(data.ev / 4)) * data.lv) / 100) + 5) * data.s);
	}

});

mm.Class('EffortCalcControl:EffortCalcBase', {
	init: function(){
		var _self = this;

		//Data
		this._personality = new mm.Personality();
		this._pocList = new mm.PockemonList();
		this.effortHash = {};
		this.errmsg = "";
		this._params = { "hp": "HP", "attack" : "攻撃", "defense" : "防御", "specialattack" : "特攻", "specialdefense" : "特防", "speed" : "すばやさ"};

	},
	calculate: function(){
		var _self = this,
			ret = [],
			topmes = '',
			copymes = '',
			index = 0;

		if( _self.validate() ){

			topmes = '残りの努力値は' + (( 508-_self._effortTotal === 0 ) ? 'ありません' : (508-_self._effortTotal)+'です');
			ret.push(topmes+"\n");

			if( _self.errmsg !== "" ){
				ret.push(_self.errmsg);
			}

			mm.each( _self._params, function( val, key ){
				var ev = _self.effortHash["ev"+key],
					data = {
						target: key,
						bv: _self.effortHash.baseData[index],
						iv: Number(_self.getValueFromId("iv"+key)),
						ev: ev,
						lv: _self.effortHash.lv,
						s: _self.effortHash.psData[index-1]
					},
					efv = _self.getEffortValue(data),
					idealefv = 0;

				//無駄計算
				if( data.ev !== 0 && data.ev-4 > 0){
					// ToDo
					// 努力値の無駄はたかだか4
					// 検証必要
					data.ev = ev-4;
					idealefv = _self.getEffortValue(data);
					if( idealefv ===  efv ){
						ret.splice( 1, 0, val+'の努力値を' + data.ev + 'にすると無駄がなくなります。');
					}
				}
				_self.effortHash["efv"+key] = efv;

				ret.push(val + ":" + efv);
				copymes += efv+ "(" + ev + ")" + "-";
				index++;
			});
			ret.push("\n"+copymes.slice(0,copymes.length-1));
		}else if( _self.errmsg !== "" ){
			ret.push(_self.errmsg);
		}
		return ret.join("\n");
	},

	// validate
	validate: function(){
		// merge to this.effortHash
		var _self = this,
			ret = null,
			name = '',
			personality = '',
			lv = 0,
			baseData = [],
			key = '',
			n = 0,
			effortIdList = ['evhp','evattack','evdefense','evspecialattack','evspecialdefense','evspeed'];

		// Input Validate handler
		var bvh = new mm.BlankValidateHandler();

		// Level Validate handler
		var lvh= new mm.NumberValidateHandler(),
			lr = new mm.LevelRangeValidateHandler();
		lvh.setNext(lr);

		// List Validate handler
		var uvh = new mm.UndefinedValidateHandler();

		// EfforValue Validate handler
		var evh= new mm.NumberValidateHandler(),
			rh = new mm.EffortRangeValidateHandler(),
			mh = new mm.MultipleValidateHandler();
		evh.setNext(rh.setNext(mh));

		// EfforValue Total Validate handler
		var eth = new mm.EffortTotalValidateHandler();


		// private
		this.effortHash = {};
		this._effortTotal = 0;
		this.errmsg = '';

		// Check Base Value
		name = _self.getValueFromId('pocname');

		ret = bvh.validate(name);
		if( ret !== true){
			_self.errmsg = ret;
			return false;
		}

		// Check Personality Value
		personality = _self.getValueFromId('personality');

		ret = bvh.validate(personality);
		if( ret !== true){
			_self.errmsg = ret;
			return false;
		}

		//Check Lv
		lv  =  Number(_self.getValueFromId('level'));

		ret = lvh.validate(lv);
		if( ret !== true){
			_self.errmsg = ret;
			return false;
		}
		_self.effortHash.lv = lv;


		//Check base data
		baseData = _self._pocList.getBasedataFromName(name);

		ret = uvh.validate(baseData);
		if( ret !== true){
			_self.errmsg = 'ポケモン名の入力が正しくありません';
			return false;
		}
		_self.effortHash.baseData = baseData.slice(2,9);


		//Check personality data
		psData = _self._personality.getPersonalityCorrection(personality);
		ret = uvh.validate(psData);
		if( ret !== true){
			_self.errmsg = 'ポケモン名の入力が正しくありません';
			return false;
		}
		_self.effortHash.psData = psData.slice(1,6);


		// Check Effort value
		mm.each( effortIdList, function(key){
			n = Number(_self.getValueFromId(key));

			ret = evh.validate(n);
			if( ret !== true){
				_self.errmsg = ret;
				return false;
			}

			_self.effortHash[key] = n;
			_self._effortTotal += n;
		});

		// Check Effort total
		ret = eth.validate(_self._effortTotal);
		if( ret !== true ){
			_self.errmsg = ret;
			return false;
		}

		return true;
	},
	// get value data
	getValueFromId: function(id){
		var node = document.getElementById(id);
		if( node ){
			if( node.tagName.up() === 'INPUT' || node.tagName.up() === 'TEXTAREA' ){
				return node.value;
			}else if( node.tagName.up() === 'SELECT' ){
				return node.options[node.selectedIndex].value;
			}
		}
		return '';
	}

});
