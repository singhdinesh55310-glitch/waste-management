#include <bits/stdc++.h>
using namespace std;
// vector<bool> seive(int n)
// {
//     vector<bool> isprime(n + 1, true);
//     isprime[0] = false;
//     isprime[1] = false;
//     for (int j = 4; j <= n; j+=2)
//     {
//         isprime[j] = false;
//     }
//     for (int i = 3; i * i <= n; i += 2)
//     {
//         if (isprime[i])
//         {
//             for (int j = i * i; j <= n; j +=2*  i)
//             {
//                 isprime[j] = false;
//             }
//         }
//     }
//     return isprime;
//  }
// int main()
// {

    //    seive of eratosthenes
//     int n = 16;

//     vector<bool> check = seive(n);
//     for (bool x : check)
//     {
//         cout << x << endl;
//     }
// }
// enhanced seive of erastothenes
// vector<int>seive(int n){
//  vector<int>spf( n+1,0);
//     vector<int>isprime;
//     for(int i=2; i<=n;i++){
//         if(spf[i]==0){
// spf[i]=i;
// isprime.push_back(i);
//         }
//         for(int p:isprime){
//             if(p>spf[i]||i*p>n)break;
//             spf[i*p]=p;
//         }
//     } return spf;
//  } int main(){
//     int n=60;
//     vector<int>check=seive(n);
//     for(int x:check){
//         cout<<x<<endl;
//     }
//  now we will finish the string

// char str[]="hello";
// cout<<strlen(str)<<endl;
// char str[100];
// cin>>str;
// cout<<"output :"<< str<<endl;
// cin.getline(str,len,delimiter)
// cin.getline(str,100,'s');
//    cout<<"output :"<< str<<endl;

//  return 0;
//    int main(){
//     string str1="apna"; int n=str1.length();
// int i=0;        while(i>n){
//         swap(str1[i],str1[n]);
//    i++; n--;

//    }}
// bool alpha(char c)
// {
//   return (c >= 'a' && c <= 'z') || c >= 'A' && c <= 'Z' || (c >= '0' && c <= '9');
// }
// bool ispalindrome(string str)
// {
//   int st = 0;
//   int end = str.length() - 1;
//   while (st <= end)
//   {
//     if (!alpha(str[st]))
//     {
//       st++;
//       continue;
//     }
//     else if (!alpha(str[end]))
//     {
//       end--;
//       continue;
//     }
//     else
//     {
//       if (alpha(str[st]) != alpha(str[end]))
//       {

//         return false;
//       }
//       st++;
//       end--;
//     }
//     return true;
//   }
// }
// int main()
// {
//   string str = "racecaR";
//   if (ispalindrome(str))
//   {
//     cout << true;
//   }
// }
// int main(){
// string str="ancdeancf";
// int n=str.length(); 
// string part="anc"; int n2=part.length();
// while(str.length()>0 ||str.find(part)<str.length() ){
// if(n2<=n){
// int y=str.find(part);
// str.erase(y,n2);
// cout<<str<<endl;
// }
// }} // permutation in string
int main(){
   string s1="ab"; string s2="eidoaoo";
    


}





