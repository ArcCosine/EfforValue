//
// 耐性目安
//

mm.Class("Endurance:EffortCalcBase",{
	_list: {
	//物理
	physical: [
		//　攻撃: ポケモン名: 技威力: 技タイプ: 性格補正: 特性補正: もちもの補正: 天候補正:
		['補正なしガブリアスの逆鱗'                 , 'ガブリアス', 120, 'ドラゴン',   1,  1,  1,  1,  1],
		['補正ありカイリューのハチマキ逆鱗'	        , 'カイリュー', 120, 'ドラゴン', 1.1,  1,1.5,  1,  1],
		['補正ありカイリューのハチマキ神速'	        , 'カイリュー',  80, 'ノーマル', 1.1,  1,1.5,  1,  1],
		['補正ありローブシンの根性ドレパン'	        , 'ローブシン',  75, 'かくとう', 1.1,1.5,  1,  1,  1],
		['補正ありローブシンの根性マッパ'	        , 'ローブシン',  40, 'かくとう', 1.1,1.5,  1,  1,  1],
		['補正ありハッサムのハチマキバレットパンチ'	, 'ハッサム'  ,  40, 'はがね'  , 1.1,1.5,1.5,  1,  1]
	],

	//特殊
	special: [
		['補正なしラティオスのりゅうせいぐん'       , 'ラティオス', 140, 'ドラゴン',   1,  1,  1,  1,  1],
		['補正なしラティオスの眼鏡りゅうせいぐん'   , 'ラティオス', 140, 'ドラゴン',   1,  1,1.5,  1,  1],
		['補正ありキングドラの雨眼鏡ハイポン'       , 'キングドラ', 120, 'みず'    , 1.1,  1,1.5,  1,1.5],
		['補正なしボルトロスの１０万ボルト'         , 'ボルトロス',  90, 'でんき'  ,   1,  1,  1,  1,  1],
		['補正ありウルガモスの大文字'               , 'ウルガモス', 120, 'ほのお'  , 1.1,  1,  1,  1,  1],
		['補正ありシャンデラのオーバーヒート'       , 'シャンデラ', 140, 'ほのお'  , 1.1,  1,  1,  1,  1]
	]
	},
	_typelist:[ 'ノーマル', 'ほのお','みず','でんき','くさ','こおり','かくとう','どく','じめん','ひこう','エスパー','むし'    ,'いわ','ゴースト','ドラゴン','あく', 'はがね'],
	_types:[
		[1,1,1,1,1,1,1,1,1,1,1,1,0.5,0,1,1,0.5],			//ノーマル
		[1,0.5,0.5,1,2,2,1,1,1,1,1,2,0.5,1,0.5,1,2],		//ほのお
		[1,2,0.5,1,0.5,1,1,1,2,1,1,1,2,1,0.5,1,1],			//みず
		[1,1,2,0.5,0.5,1,1,1,0,2,1,1,1,1,0.5,1,1],			//でんき
		[1,0.5,2,1,0.5,1,1,0.5,2,0.5,1,0.5,2, 1,0.5,1,0.5],	//くさ
		[1,0.5,0.5,1,2,0.5,1,1,2,2,1,1,1, 1,2,1,0.5],		//こおり
		[2,1,1,1,1,2,1,0.5,1,0.5,0.5,0.5,2,0,1,2,2],		//かくとう
		[1,1,1,1,2,1,1,0.5,0.5,1,1,1,0.5,0.5,1,1,0],		//どく
		[1,2,1,2,0.5,1,1,2,1,0,1,0.5,2,1,1,1,2],			//じめん
		[1,1,1,0.5,2,1,2,1,1,1,1,2,0.5,1,1,1,0.5],			//ひこう
		[1,1,1,1,1,1,2,2,1,1,0.5,1,1,1,1,0,0.5],			//エスパー
		[1,0.5,1,1,2,1,0.5,0.5,1,0.5,2,1,1,0.5,1,2,0.5],	//むし
		[1,2,1,1,1,2,0.5,1,0.5,2,1,2,1,1,1,1,0.5],			//いわ
		[0,1,1,1,1,1,1,1,1,1,2,1,1,2,1,0.5,0.5],			//ゴースト
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,0.5],				//ドラゴン
		[1,1,1,1,1,1,0.5,1,1,1,2,1,1,2,1,0.5,0.5],			//あく
		[1,0.5,0.5,0.5,1,2,1,1,1,1,1,1,2,1,1,1,0.5]			//はがね
	],
	init: function(efv){
		this._pocefv = efv;
		this.calcEndurance();
	},
	calcEndurance: function(){
		var pocList = new mm.PockemonList(),
			ret = [],
			attackList = [],
			attackType, poc, base, ho, defense, lv, power1, power2,
			_self = this;

		mm.each(this._list, function(value, key ){
			ret = new Array();
			mm.each( value, function(data){
				lv = _self._pocefv.lv;
				poc = pocList.getBasedataFromName(data[1]);
				base = (key === "physical") ? poc[3] : poc[5];
				base = _self.getEffortValue({
					lv: lv,
					bv: base,
					iv: 31,
					ev: 252,
					s: data[4]
				});


				attackList = data.slice(5,8);
				attackType = poc[8];
				attackType= attackType.split('/');
				if( attackType.has(data[3]) ){
					attackList.push(1.5);
				}

				base = _self.attackCorrection( base, attackList);

				defense = (key === "physical") ? _self._pocefv.efvdefense: _self._pocefv.efvspecialdefense;

				defense = _self.defenceType( defense, data[3] );

				if( defense !== Number.POSITIVE_INFINITY ){
					power1 = Math.floor(Math.floor((lv*2/5+2)) * data[2] * base / defense / 50)+2;
					power2 = Math.floor(power1*0.85);
				}else{
					power1 = 0;
					power2 = 0;
				}

				ret.push( data[0] + " : " + power2 + "-" + power1 );
			});
			//Set Endurance
			document.querySelector('#'+key+'Endurance + textarea').value = ret.join("\n");
		});

	},
	attackCorrection: function(base,datas){
		datas.each(function(one){
			base = Math.floor(base*one);
		})
		return base;
	},
	defenceType: function(base, attackType ){
		var _self = this;
		var apos = _self._typelist.indexOf(attackType);
		var types = this._pocefv.baseData[6];
		types = types.split('/');


		types.each(function(type){
			dpos = _self._typelist.indexOf(type);
			correction = _self._types[apos][dpos];
			base /= correction
		});

		return base;
	},

	// poc floor
	round: function(num){
		if( num - Math.floor(num)  === 0.5 ){
			return Math.floor(num);
		}
		return Math.round(num);
	}
});



