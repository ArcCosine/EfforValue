// 素早さ

mm.Class("EffortSpeed:EffortCalcBase",{
	_list:[ 130, 125, 120, 115, 110, 108, 102, 100, 90, 80, 70, 61, 50, 30 ],
	init: function(data){
		var _self=this, ret=[],obj={};
		this._list.each(function(speed){
			obj={
				bv:speed,
				iv:31,
				ev: 252,
				lv: data.lv,
				s:1.1
			}
			ret.push(speed + "族:" + _self.getEffortValue(obj));
		});
		document.querySelector('#speedParam+.endurance').value = ret.join("\n");
	}

});
