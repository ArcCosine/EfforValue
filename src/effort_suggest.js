//
// Suggest to text box
// Base Code http://la.ma.la/js/roma.html
//
//

mm.Class( 'Suggest:Singleton', {

	_romadic :  {"a":"ア","i":"イ","yi":"イ","u":"ウ","wu":"ウ","whu":"ウ","e":"エ","o":"オ","la":"ァ","xa":"ァ","li":"ィ","xi":"ィ","lyi":"ィ","xyi":"ィ","lu":"ゥ","xu":"ゥ","le":"ェ","xe":"ェ","lye":"ェ","xye":"ェ","lo":"ォ","xo":"ォ","wha":"ウァ","whi":"ウィ","wi":"ウィ","whe":"ウェ","we":"ウェ","who":"ウォ","ka":"カ","ca":"カ","ki":"キ","ku":"ク","cu":"ク","qu":"ク","ke":"ケ","ko":"コ","co":"コ","lka":"ヵ","xka":"ヵ","lke":"ヶ","xke":"ヶ","ga":"ガ","gi":"ギ","gu":"グ","ge":"ゲ","go":"ゴ","kya":"キャ","kyi":"キィ","kyu":"キュ","kye":"キェ","kyo":"キョ","qya":"クャ","qyu":"クュ","qwa":"クァ","qa":"クァ","kwa":"クァ","qwi":"クィ","qi":"クィ","qyi":"クィ","qwu":"クゥ","qwe":"クェ","qe":"クェ","qye":"クェ","qwo":"クォ","qo":"クォ","gya":"ギャ","gyi":"ギィ","gyu":"ギュ","gye":"ギェ","gyo":"ギョ","gwa":"グァ","gwi":"グィ","gwu":"グゥ","gwe":"グェ","gwo":"グォ","sa":"サ","si":"シ","ci":"シ","shi":"シ","su":"ス","se":"セ","ce":"セ","so":"ソ","za":"ザ","zi":"ジ","ji":"ジ","zu":"ズ","ze":"ゼ","zo":"ゾ","sya":"シャ","sha":"シャ","syi":"シィ","syu":"シュ","shu":"シュ","sye":"シェ","she":"シェ","syo":"ショ","sho":"ショ","swa":"スァ","swi":"スィ","swu":"スゥ","swe":"スェ","swo":"スォ","zya":"ジャ","ja":"ジャ","jya":"ジャ","zyi":"ジィ","jyi":"ジィ","zyu":"ジュ","ju":"ジュ","jyu":"ジュ","zye":"ジェ","je":"ジェ","jye":"ジェ","zyo":"ジョ","jo":"ジョ","jyo":"ジョ","ta":"タ","ti":"チ","chi":"チ","tu":"ツ","tsu":"ツ","te":"テ","to":"ト","ltu":"ッ","xtu":"ッ","ltsu":"ッ","da":"ダ","di":"ヂ","du":"ヅ","de":"デ","do":"ド","tya":"チャ","cha":"チャ","cya":"チャ","tyi":"チィ","cyi":"チィ","tyu":"チュ","chu":"チュ","cyu":"チュ","tye":"チェ","che":"チェ","cye":"チェ","tyo":"チョ","cho":"チョ","cyo":"チョ","tsa":"ツァ","tsi":"ツィ","tse":"ツェ","tso":"ツォ","tha":"テャ","thi":"ティ","thu":"テュ","the":"テェ","tho":"テョ","twa":"トァ","twi":"トィ","twu":"トゥ","twe":"トェ","two":"トォ","dya":"ヂャ","dyi":"ヂィ","dyu":"ヂュ","dye":"ヂェ","dyo":"ヂョ","dha":"デャ","dhi":"ディ","dhu":"デュ","dhe":"デェ","dho":"デョ","dwa":"ドァ","dwi":"ドィ","dwu":"ドゥ","dwe":"ドェ","dwo":"ドォ","na":"ナ","ni":"ニ","nu":"ヌ","ne":"ネ","no":"ノ","nya":"ニャ","nyi":"ニィ","nyu":"ニュ","nye":"ニェ","nyo":"ニョ","ha":"ハ","hi":"ヒ","hu":"フ","fu":"フ","he":"ヘ","ho":"ホ","ba":"バ","bi":"ビ","bu":"ブ","be":"ベ","bo":"ボ","pa":"パ","pi":"ピ","pu":"プ","pe":"ペ","po":"ポ","hya":"ヒャ","hyi":"ヒィ","hyu":"ヒュ","hye":"ヒェ","hyo":"ヒョ","fya":"フャ","fyu":"フュ","fyo":"フョ","fwa":"ファ","fa":"ファ","fwi":"フィ","fi":"フィ","fyi":"フィ","fwu":"フゥ","fwe":"フェ","fe":"フェ","fye":"フェ","fwo":"フォ","fo":"フォ","bya":"ビャ","byi":"ビィ","byu":"ビュ","bye":"ビェ","byo":"ビョ","va":"ヴァ","vi":"ヴィ","vu":"ヴ","ve":"ヴェ","vo":"ヴォ","vya":"ヴャ","vyi":"ヴィ","vyu":"ヴュ","vye":"ヴェ","vyo":"ヴョ","pya":"ピャ","pyi":"ピィ","pyu":"ピュ","pye":"ピェ","pyo":"ピョ","ma":"マ","mi":"ミ","mu":"ム","me":"メ","mo":"モ","mya":"ミャ","myi":"ミィ","myu":"ミュ","mye":"ミェ","myo":"ミョ","ya":"ヤ","yu":"ユ","yo":"ヨ","lya":"ャ","xya":"ャ","lyu":"ュ","xyu":"ュ","lyo":"ョ","xyo":"ョ","ra":"ラ","ri":"リ","ru":"ル","re":"レ","ro":"ロ","rya":"リャ","ryi":"リィ","ryu":"リュ","rye":"リェ","ryo":"リョ","wa":"ワ","wo":"ヲ","n":"ン","nn":"ン","n'":"ン","xn":"ン","lwa":"ヮ","xwa":"ヮ",".":"。",",":"、","bb":"ッ","cc":"ッ","dd":"ッ","ff":"ッ","gg":"ッ","hh":"ッ","jj":"ッ","kk":"ッ","ll":"ッ","mm":"ッ","pp":"ッ","qq":"ッ","rr":"ッ","ss":"ッ","tt":"ッ","vv":"ッ","ww":"ッ","xx":"ッ","yy":"ッ","zz":"ッ","-":"ー"},

	roma2: function(text){

		var nstr=[] ,temp ,kana ,skip = 0, latin = /[a-zA-Z.,-]/,  i = 0, iz = text.length,rd=this._romadic;

		for( ;i<iz; i++ ){
			if( skip > 0){
				skip--;
				continue;
			}
			temp = text.charAt(i);
			if(!latin.test(temp)){
				nstr.push(temp);
				continue;
			}
			var slen = 5, f = false;
			while(--slen){
				temp = text.slice(i, i+slen);
				if(!rd.hasOwnProperty(temp)){
					continue;
				}
				f = true;
				kana = rd[temp];
				skip = (slen === 2) ? 1: slen-1;
				slen === 2 && kana.charAt(0) === rd.tt && i--;
				nstr.push(kana);
				break;
			}
			!f && nstr.push(temp);
		}
		return nstr.join("");
	}

});
