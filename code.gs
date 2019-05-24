function GetGroupAddress()
{
  // アクティブなシート取得
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 
  // グループ一覧の取得
  var groups = AdminDirectory.Groups.list({domain: 'kanmu.co.jp'});
  

  if(groups) {
    var rows = [];
    var rowcount = 0;
    // ヘッダ行
    rows.push(["グループアドレス", "説明", "ユーザー名", "登録ユーザー数", "メールアドレス"]);
   Logger.log(groups)
    // データ行
    for(var i = 0; i < groups.groups.length; i++){ 

      // グループに所属するメンバーの取得
      var members = AdminDirectory.Members.list(groups.groups[i].email).members                       

        if(members) {
      for (var j = 0; j < members.length; j++){
        var cols = [];         
        cols.push(groups.groups[i].email);
        cols.push(groups.groups[i].description);
        cols.push(groups.groups[i].name);
        cols.push(groups.groups[i].directMembersCount);
        
        cols.push(members[j].email);
       
        // 行追加
        rows.push(cols);
      }
     
      // 最終的な行数計算
      rowcount = rowcount + members.length;
          
          
        }else//グループにメンバーがいない場合の処理
        {
        var cols = [];         
        cols.push(groups.groups[i].email);
        cols.push(groups.groups[i].description);
        cols.push(groups.groups[i].name);
        cols.push(groups.groups[i].directMembersCount);
        
        cols.push("none");
       
        // 行追加
        rows.push(cols);        
      　rowcount = rowcount + 1;        
        }

      
    }
   
    // 書き込み
    sheet.getRange(1, 1, rowcount +1 , 5).setValues(rows);
  } 
}
function onOpen() {
  SpreadsheetApp.getUi()
  .createMenu("管理")
  .addItem("グループアドレス一覧取得", "GetGroupAddress")
  .addToUi();
}