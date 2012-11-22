//
// 性格補正リスト
// getNameList:
//   名前一覧の取得
// getPersonalityCorrection:
//   名前で、性格補正の取得
//

// personality control class
mm.Class("Personality:Singleton", {

	_list:[
 ["さみしがり",1.1, 0.9, 1.0, 1.0, 1.0],
 ["いじっぱり",1.1, 1.0, 0.9, 1.0, 1.0],
 ["やんちゃ",  1.1, 1.0, 1.0, 0.9, 1.0],
 ["ゆうかん",  1.1, 1.0, 1.0, 1.0, 0.9],
 ["ずぶとい",  0.9, 1.1, 1.0, 1.0, 1.0],
 ["わんぱく",  1.0, 1.1, 0.9, 1.0, 1.0],
 ["のうてんき",1.0, 1.1, 1.0, 0.9, 1.0],
 ["のんき",    1.0, 1.1, 1.0, 1.0, 0.9],
 ["ひかえめ",  0.9, 1.0, 1.1, 1.0, 1.0],
 ["おっとり",  1.0, 0.9, 1.1, 1.0, 1.0],
 ["うっかりや",1.0, 1.0, 1.1, 0.9, 1.0],
 ["れいせい",  1.0, 1.0, 1.1, 1.0, 0.9],
 ["おだやか",  0.9, 1.0, 1.0, 1.1, 1.0],
 ["おとなしい",1.0, 0.9, 1.0, 1.1, 1.0],
 ["しんちょう",1.0, 1.0, 0.9, 1.1, 1.0],
 ["なまいき",  1.0, 1.0, 1.0, 1.1, 0.9],
 ["おくびょう",0.9, 1.0, 1.0, 1.0, 1.1],
 ["せっかち",  1.0, 0.9, 1.0, 1.0, 1.1],
 ["ようき",    1.0, 1.0, 0.9, 1.0, 1.1],
 ["むじゃき",  1.0, 1.0, 1.0, 0.9, 1.1],
 ["てれや",    1.0, 1.0, 1.0, 1.0, 1.0],
 ["がんばりや",1.0, 1.0, 1.0, 1.0, 1.0],
 ["すなお",    1.0, 1.0, 1.0, 1.0, 1.0],
 ["きまぐれ",  1.0, 1.0, 1.0, 1.0, 1.0],
 ["まじめ",    1.0, 1.0, 1.0, 1.0, 1.0]
],

	getNameList:function(){
		var ret = [];
		this._list.each(function(one){
			ret.push(one[0]);
		});
		return ret.sort();
	},

	getPersonalityCorrection: function(name){
		return this._list.match(function(one){ return name === one[0]; });
	}
});