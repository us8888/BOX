<?php 
$postfields = 'captcha=123'; 
$cookies = "regimcode_162100bbs=123"; 
$web1 = 'http://103.45.68.47:6800/gy/gy-fabu.php'; 
$result = curl($web1, $cookies, $postfields); 
preg_match('/>p3p端口：<a href="(.*?)"/', $result, $matches); 
$web2 = $matches[1]; 
$result = curl($web2); 
echo $result; 

function curl($url, $cookies = '' ,$postfields = ''){ 
$ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'; 
$ch = curl_init(); 
curl_setopt($ch, CURLOPT_URL, $url); 
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
if(!empty($postfields) && !empty($cookies)) 
{ 
  curl_setopt($ch, CURLOPT_POST, 1); 
  curl_setopt($ch, CURLOPT_POSTFIELDS, $postfields); 
  curl_setopt($ch, CURLOPT_COOKIE, $cookies); 
}else{ 
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");  
} 
curl_setopt($ch, CURLOPT_USERAGENT, $ua); 
curl_setopt($ch, CURLOPT_TIMEOUT, 10); 
$result = curl_exec($ch); 
curl_close($ch); 
return $result; 
} 
?>