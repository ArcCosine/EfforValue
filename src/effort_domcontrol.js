//
// Domcontrol Class
//

// Personality List Control.

mm.Class('DOMPersonalityList', {
	init: function(){
		var list = new mm.Personality().getNameList(),
			option,
			personality = document.getElementById('personality');

		list.forEach(function(one, index){
			option = personality.appendChild(document.createElement('option'));
			option.appendChild(document.createTextNode(one));
			option.value = one;
			if( index === 0 ){
				option.selected = true;
			}
		});

	}
});


// Suggest Control

mm.Class('DOMSuggest', {
	init: function () {
		// DOM
		this._box = document.querySelector('#pocname');
		this._suggestlist = document.querySelector('#suggestlist');
		this._poclists = new mm.PockemonList().getList("name");

	    // mofmof
		this._suggest = new mm.Suggest();

		var _self = this,
   			actionList = actionList = {
				'keyup'   : function(ev){ _self.handleCheck(ev); },
				'keydown' : function(ev){ _self.handleUpdown(ev); },
				'blur'    : function(ev){ _self.suggestOutput(''); },
				'focus'   : function(ev){ _self.handleCheck(ev); }
			};

		mm.each(actionList,function( fn, act ){
			_self._box.addEventListener( act , fn, false );
		});

	},

	handleCheck: function(ev){

		// Specialkey check
		if(ev.keyCode === 40 || ev.keyCode === 38 || ev.keyCode == 13){
			return false;
		}

		var ret = this._suggest.roma2(ev.target.value).toString(),
			_top = ev.target.offsetTop + ev.target.offsetHeight,
		   	_left = ev.target.offsetLeft,
			_sha = ['<ul>'];	// Suggest html array

		// Hide suggest list
		if( ret.length == 0 ){
			this.suggestOutput('');
			return false;
		}

		// Create suggest list html
	    this._poclists.forEach(function(data){
			if( data.indexOf(ret) ===  0 || data.match(ret) ){
				_sha.push('<li><span class="hover">'+data+'</span></li>');
			}
		});
		_sha.push('</ul>');
		_sha[1] = _sha[1].replace(/hover/,'hover select');

		this._suggestlist.style.cssText = [
			'position:absolute;',
			'top:',_top,'px;',
			'left:',_left,'px;'
		].join('');

		this.suggestOutput(_sha.join(''));
	},

	handleUpdown: function(ev){
		var isUp = (ev.keyCode===38),
			wlist = Array.from(this._suggestlist.querySelectorAll('span')),
			select = this._suggestlist.querySelector('span.select');

		switch(ev.keyCode){
			// Return Key
			case 13:
				if( select ){
					this._box.value = select.textContent;
					this.suggestOutput('');
				}
				break;
			// Up and Down Key
			case 38:
			case 40:
				ev.preventDefault();

				wlist.some(function(node, index){
					if( node.className.indexOf('select') > -1 ){
						if( isUp && index !== 0 ){
							node.className = node.className.replace(/ select/,'');
							wlist[index-1].className += ' select';
							return false;
						}
						if( !isUp && index !== wlist.length-1 ){
							node.className = node.className.replace(/ select/,'');
							wlist[index+1].className += ' select';
							return true;
						}
					}
				});
				break;
		}
	},

	suggestOutput: function(html){
		this._suggestlist.innerHTML = html;
	}

});

//
// Effort Value Calc
//

mm.Class('DOMEfforCalc',{
	init: function(){

		var evc = new mm.EffortCalcControl(),
			hash = {};

		document.getElementById('calculate').addEventListener('click', function(){
			document.getElementById('result').value = evc.calculate();

			hash = evc.effortHash;

			// 耐久値
			new mm.Endurance(hash);

			// 素早さ
			new mm.EffortSpeed(hash);

		}, false );
	}
});

