var obj_smileys = {
    path : "images/smileys/",
    data : {
        //smiley        image name                     width   height   alt
        ':-)'           :  new Array('grin.gif',           '19',   '19',   'grin'),
        ':lol:'         :  new Array('lol.gif',            '19',   '19',   'LOL'),
        ':cheese:'      :  new Array('cheese.gif',         '19',   '19',   'cheese'),
        ':)'            :  new Array('smile.gif',          '19',   '19',   'smile'),
        ';-)'           :  new Array('wink.gif',           '19',   '19',   'wink'),
        ';)'            :  new Array('wink.gif',           '19',   '19',   'wink'),
        ':smirk:'       :  new Array('smirk.gif',          '19',   '19',   'smirk'),
        ':roll:'        :  new Array('rolleyes.gif',       '19',   '19',   'rolleyes'),
        ':-S'           :  new Array('confused.gif',       '19',   '19',   'confused'),
        ':wow:'         :  new Array('surprise.gif',       '19',   '19',   'surprised'),
        ':bug:'         :  new Array('bigsurprise.gif',    '19',   '19',   'big surprise'),
        ':-P'           :  new Array('tongue_laugh.gif',   '19',   '19',   'tongue laugh'),
        '%-P'           :  new Array('tongue_rolleye.gif', '19',   '19',   'tongue rolleye'),
        ';-P'           :  new Array('tongue_wink.gif',    '19',   '19',   'tongue wink'),
        ':P'            :  new Array('raspberry.gif',      '19',   '19',   'raspberry'),
        ':blank:'       :  new Array('blank.gif',          '19',   '19',   'blank stare'),
        ':long:'        :  new Array('longface.gif',       '19',   '19',   'long face'),
        ':ohh:'         :  new Array('ohh.gif',            '19',   '19',   'ohh'),
        ':grrr:'        :  new Array('grrr.gif',           '19',   '19',   'grrr'),
        ':gulp:'        :  new Array('gulp.gif',           '19',   '19',   'gulp'),
        '8-/'           :  new Array('ohoh.gif',           '19',   '19',   'oh oh'),
        ':down:'        :  new Array('downer.gif',         '19',   '19',   'downer'),
        ':red:'         :  new Array('embarrassed.gif',    '19',   '19',   'red face'),
        ':sick:'        :  new Array('sick.gif',           '19',   '19',   'sick'),
        ':shut:'        :  new Array('shuteye.gif',        '19',   '19',   'shut eye'),
        ':-/'           :  new Array('hmm.gif',            '19',   '19',   'hmmm'),
        //'>:('         :  new Array('mad.gif',            '19',   '19',   'mad'),
        ':mad:'         :  new Array('mad.gif',            '19',   '19',   'mad'),
        //'>:-('            :  new Array('angry.gif',          '19',   '19',   'angry'),
        ':angry:'       :  new Array('angry.gif',          '19',   '19',   'angry'),
        ':zip:'         :  new Array('zip.gif',            '19',   '19',   'zipper'),
        ':kiss:'        :  new Array('kiss.gif',           '19',   '19',   'kiss'),
        ':ahhh:'        :  new Array('shock.gif',          '19',   '19',   'shock'),
        ':coolsmile:'   :  new Array('shade_smile.gif',    '19',   '19',   'cool smile'),
        ':coolsmirk:'   :  new Array('shade_smirk.gif',    '19',   '19',   'cool smirk'),
        ':coolgrin:'    :  new Array('shade_grin.gif',     '19',   '19',   'cool grin'),
        ':coolhmm:'     :  new Array('shade_hmm.gif',      '19',   '19',   'cool hmm'),
        ':coolmad:'     :  new Array('shade_mad.gif',      '19',   '19',   'cool mad'),
        ':coolcheese:'  :  new Array('shade_cheese.gif',   '19',   '19',   'cool cheese'),
        ':vampire:'     :  new Array('vampire.gif',        '19',   '19',   'vampire'),
        ':snake:'       :  new Array('snake.gif',          '19',   '19',   'snake'),
        ':exclaim:'     :  new Array('exclaim.gif',        '19',   '19',   'excaim'),
        ':question:'    :  new Array('question.gif',       '19',   '19',   'question') // no comma after last item
    },
    found_image : function(str)
    {
        return this.data[str];
    },
    convert_character_to_smileys : function(str)
    {
        for(smiley in this.data)
        {
            var index = str.indexOf(smiley);
            while(index != -1)
            {
                var html_smiley = "<img src='"+this.path + this.data[smiley][0]+"' />";
                var str = str.replace(smiley, html_smiley);
                index = str.indexOf(smiley);
            }
        }
        return str;
    }
};