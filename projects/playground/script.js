---
permalink: /script.js
---
/* ******************************************* */

/* DO NOT REMOVE THIS COPYWRITE INFO! */

/* Retirement Savings Calculator V3 */

/* 2009 Daniel C. Peterson ALL RIGHTS RESERVED */

/* Created: 05/22/2009 */

/* Last Modified: 10/26/2012 */

/* This script may not be copied, edited, distributed or reproduced */

/* without express written permission from */

/* Daniel C. Peterson of Web Winder Website Services */

/* For commercial use rates, contact: */

/* Dan Peterson: */

/* Web Winder Website Services */

/* P.O. Box 11 */

/* Bemidji, MN  56619 */

/* dan@webwinder.com */

/* http://www.webwinder.com */

/* Commercial User Licence #:8115-1832-166-1729 */

/* Commercial Licence Date:2018-10-16 */

/* ******************************************* */







function FVsingleDep(prin, intRate, numMonths, numCompPerYr) {



var i = 0;

var intEarn = 0;

var singleFV = prin;



intRate /= 100;



if(numCompPerYr == "" || numCompPerYr == 0) {

   numCompPerYr = 12;

}

intRate /= numCompPerYr;



var numPeriods = numMonths / 12 * numCompPerYr;



singleFV = Math.pow((eval(1) + eval(intRate)), numPeriods) * singleFV;



return singleFV;



}







function PVsingleAmt(f_fv, f_rate, f_yrs, f_cpy) {



   var f_prin = f_fv;

   var f_i = f_rate;

   var f_npr = f_yrs * f_cpy;



   var f_count = 0;

   var f_factor = 1;



   f_i /= 100;

   f_i /= f_cpy;

   var f_pow = Number(1) + Number(f_i);





   while(f_count < f_npr) {





     f_factor = f_factor * f_pow;

     f_count += 1;



   }



   f_prin = f_fv / f_factor;

   return f_prin;



}







function fn(num, places, comma) {



var isNeg=0;



    if(num < 0) {

       num=num*-1;

       isNeg=1;

    }



    var myDecFact = 1;

    var myPlaces = 0;

    var myZeros = "";

    while(myPlaces < places) {

       myDecFact = myDecFact * 10;

       myPlaces = Number(myPlaces) + Number(1);

       myZeros = myZeros + "0";

    }



                onum=Math.round(num*myDecFact)/myDecFact;



                integer=Math.floor(onum);



                if (Math.ceil(onum) == integer) {

                                decimal=myZeros;

                } else{

                                decimal=Math.round((onum-integer)* myDecFact)

                }

                decimal=decimal.toString();

                if (decimal.length<places) {

        fillZeroes = places - decimal.length;

                   for (z=0;z<fillZeroes;z++) {

        decimal="0"+decimal;

        }

     }



   if(places > 0) {

      decimal = "." + decimal;

   }



   if(comma == 1) {

                integer=integer.toString();

                var tmpnum="";

                var tmpinteger="";

                var y=0;



                for (x=integer.length;x>0;x--) {

                                tmpnum=tmpnum+integer.charAt(x-1);

                                y=y+1;

                                if (y==3 & x>1) {

                                                tmpnum=tmpnum+",";

                                                y=0;

                                }

                }



                for (x=tmpnum.length;x>0;x--) {

                                tmpinteger=tmpinteger+tmpnum.charAt(x-1);

                }





                finNum=tmpinteger+""+decimal;

   } else {

      finNum=integer+""+decimal;

   }



    if(isNeg == 1) {

       finNum = "-" + finNum;

    }



                return finNum;

}









function sn(num) {



   num=num.toString();





   var len = num.length;

   var rnum = "";

   var test = "";

   var j = 0;



   var b = num.substring(0,1);

   if(b == "-") {

      rnum = "-";

   }



   for(i = 0; i <= len; i++) {



      b = num.substring(i,i+1);



      if(b == "0" || b == "1" || b == "2" || b == "3" || b == "4" || b == "5" || b == "6" || b == "7" || b == "8" || b == "9" || b == ".") {

         rnum = rnum + "" + b;



      }



   }



   if(rnum == "" || rnum == "-") {

      rnum = 0;

   }



   rnum = Number(rnum);



   return rnum;



}



function mo_save(f_rate, f_gap, f_years) {



/* FIGURE PRESENT VALUE OF ADJUSTED SAVINGS GAP */



   var f_count = 0;



   var f_i = f_rate / 100;



   var f_months = f_years;



   var f_factor = Number(1) + Number(f_i);



   var f_denom = 1;



   while(f_count < f_months) {

      f_denom = f_denom * f_factor;

      f_count = Number(f_count) + Number(1);

   }



   var f_pv = Number(f_denom) - Number(1);



   f_pv = f_i / f_pv;



   f_pv = f_pv * f_gap;



   return f_pv;

}



function schedule(form) {



   var sched_area = document.getElementById("sched_div");

   sched_area.innerHTML = "";



   if(document.calc.now_age_1.value.length == 0 || document.calc.now_age_1.value == 0) {

      alert("Please enter age at the end of current year.");

      document.calc.now_age_1.focus();

   } else

   if(document.calc.retire_age_1.value.length == 0 || document.calc.retire_age_1.value == 0) {

      alert("Please enter the age you plan to retire at.");

      document.calc.retire_age_1.focus();

   } else

   if(Number(document.calc.now_age_1.value) >= Number(document.calc.retire_age_1.value)) {

      alert("Please enter a retirement age that is greater than your current age.");

      document.calc.retire_age_1.focus();

   } else

   if(document.calc.life_age_1.value.length == 0 || document.calc.life_age_1.value == 0) {

      alert("Please enter the age you expect to live until.");

      document.calc.life_age_1.focus();

   } else

   if(document.calc.ann_ret_inc.value.length == 0 || document.calc.ann_ret_inc.value == 0) {

      alert("Please enter the desired annual retirement income.");

      document.calc.ann_ret_inc.focus();

   } else

   if(Number(document.calc.reduce_ret_inc_perc.value) > 0 && Number(document.calc.reduce_ret_inc_yrs.value) == 0) {

      alert("Please enter year increments you would like to reduce our retirement income need.");

      document.calc.reduce_ret_inc_yrs.focus();

   } else

   if(Number(document.calc.cur_contrib_1.value) > 0 && Number(document.calc.stop_contrib_1.value) == 0) {

      alert("Please enter the age to stop contributions.");

      document.calc.stop_contrib_1.focus();

   } else

   if(document.calc.rate.value.length == 0 || document.calc.rate.value == 0) {

      alert("Please enter the Annual Interest Rate you expect to earn.");

      document.calc.rate.focus();

   } else

   if(sn(document.calc.ret_inc_1_1.value) > 0 && (sn(document.calc.ret_1_start_age_1.value) == 0 || sn(document.calc.ret_1_stop_age_1.value) == 0)) {

      alert("Please enter a start and stop age for " + document.calc.ret_1_name.value + " in order to have it included in the calculations.");

      document.calc.ret_1_start_age_1.focus();

   } else

   if(sn(document.calc.ret_inc_2_1.value) > 0 && (sn(document.calc.ret_2_start_age_1.value) == 0 || sn(document.calc.ret_2_stop_age_1.value) == 0)) {

      alert("Please enter a start and stop age for " + document.calc.ret_2_name.value + " in order to have it included in the calculations.");

      document.calc.ret_2_start_age_1.focus();

   } else

   if(sn(document.calc.ret_inc_3_1.value) > 0 && (sn(document.calc.ret_3_start_age_1.value) == 0 || sn(document.calc.ret_3_stop_age_1.value) == 0)) {

      alert("Please enter a start and stop age for " + document.calc.ret_3_name.value + " in order to have it included in the calculations.");

      document.calc.ret_3_start_age_1.focus();

   } else

   if(sn(document.calc.one_time_amt_1.value) > 0 && sn(document.calc.one_time_age_1.value) == 0) {

      alert("Please enter the age you expect to receive the " + document.calc.one_time_amt_name_1.value + " in order to have it included in the calculations.");

      document.calc.one_time_age_1.focus();

   } else

   if(sn(document.calc.one_time_amt_2.value) > 0 && sn(document.calc.one_time_age_2.value) == 0) {

      alert("Please enter the age you expect to receive the " + document.calc.one_time_amt_name_2.value + " in order to have it included in the calculations.");

      document.calc.one_time_age_2.focus();

   } else

   if(sn(document.calc.one_time_amt_3.value) > 0 && sn(document.calc.one_time_age_3.value) == 0) {

      alert("Please enter the age you expect to receive the " + document.calc.one_time_amt_name_3.value + " in order to have it included in the calculations.");

      document.calc.one_time_age_3.focus();

   } else

   if(sn(document.calc.one_time_amt_4.value) > 0 && sn(document.calc.one_time_age_4.value) == 0) {

      alert("Please enter the age you expect to receive the " + document.calc.one_time_amt_name_4.value + " in order to have it included in the calculations.");

      document.calc.one_time_age_4.focus();

   } else {



      var today = new Date();

      var dayFactor = today.getTime();

      var pmtDay = today.getDate();

      var loanMM = today.getMonth() + 1;

      var loanYY = today.getYear();

      if(loanYY < 1900) {

         loanYY += 1900;

      }

      var loanDate = (loanMM + "/" + pmtDay + "/" + loanYY);

      document.calc.report_date.value = loanDate;

      var monthMS = 86400000 * 30.4;



      var cur_yr = loanYY;



      var v_now_age_1 = sn(document.calc.now_age_1.value);

      var v_retire_age_1 = sn(document.calc.retire_age_1.value);

      var v_life_age_1 = sn(document.calc.life_age_1.value);



      /* ANNUAL YEARS AND AGES ***CHANGED*** */

      var v_yrs_till_ret_1 = Number(v_retire_age_1) - Number(v_now_age_1);

      var v_pre_yrs = v_yrs_till_ret_1;



      var age_1 = v_now_age_1;



      /* MAX RETIREMENT YEARS ***CHANGED*** */

      var v_tot_yrs_1 = Number(v_life_age_1) - Number(v_now_age_1);

      var rep_yrs = v_tot_yrs_1;



      /* ANNUAL CONTRIBUTIONS */

      var v_cur_contrib_1 = sn(document.calc.cur_contrib_1.value);

      var cur_yr_cont = Number(12) - Number(loanMM);

      var pre_mon_contrib = Number(v_cur_contrib_1);

      var ann_contrib = 0;

      var v_stop_contrib_1 = sn(document.calc.stop_contrib_1.value);



      /* CURRENT SAVINGS */

      var v_cur_savings_1 = sn(document.calc.cur_savings_1.value);

      var cur_savings_tot = Number(v_cur_savings_1);





      /* ANNUAL INTEREST EARNED */

      var v_rate = sn(document.calc.rate.value);

      var int = v_rate / 100;

      var ann_int_earn = 0;

      var accum_save = cur_savings_tot;

      var beg_bal = 0;

      var end_bal = 0;



      /* ANNUAL INFLATION */

      var v_ann_ret_inc = sn(document.calc.ann_ret_inc.value);

      var v_inflate = sn(document.calc.inflate.value);

      var base_fact = v_inflate / 100;

      var ann_infl_mult = Number(1) + Number(base_fact);

      var accum_infl_fact = 1;

      var infl_ann_inc = 0;



      /* POST RETIREMENT INCOME TAX */

      var v_tax_rate = sn(document.calc.tax_rate.value);

      var tax_perc = v_tax_rate / 100;



      /* RETIREMENT INCOME */

      var v_ret_inc_1_1 = sn(document.calc.ret_inc_1_1.value);

      var v_ret_1_start_age_1 = sn(document.calc.ret_1_start_age_1.value);

      var v_ret_1_stop_age_1 = sn(document.calc.ret_1_stop_age_1.value);

      var v_ret_1_col = sn(document.calc.ret_1_col.value);

      var ret_1_col = Number(1) + Number(v_ret_1_col / 100);

      var accum_ret_1_col = Number(1);

      var v_ret_1_col_start = document.calc.ret_1_col_start.selectedIndex;



      var v_ret_inc_2_1 = sn(document.calc.ret_inc_2_1.value);

      var v_ret_2_start_age_1 = sn(document.calc.ret_2_start_age_1.value);

      var v_ret_2_stop_age_1 = sn(document.calc.ret_2_stop_age_1.value);

      var v_ret_2_col = sn(document.calc.ret_2_col.value);

      var ret_2_col = Number(1) + Number(v_ret_2_col / 100);

      var accum_ret_2_col = Number(1);

      var v_ret_2_col_start = document.calc.ret_2_col_start.selectedIndex;



      var v_ret_inc_3_1 = sn(document.calc.ret_inc_3_1.value);

      var v_ret_3_start_age_1 = sn(document.calc.ret_3_start_age_1.value);

      var v_ret_3_stop_age_1 = sn(document.calc.ret_3_stop_age_1.value);

      var v_ret_3_col = sn(document.calc.ret_3_col.value);

      var ret_3_col = Number(1) + Number(v_ret_3_col / 100);

      var accum_ret_3_col = Number(1);

      var v_ret_3_col_start = document.calc.ret_3_col_start.selectedIndex;





      var ret_inc = 0;



      /* ONE-TIME BENEFIT */

      var v_one_time_amt_1 = sn(document.calc.one_time_amt_1.value);

      var v_one_time_age_1 = sn(document.calc.one_time_age_1.value);



      var v_one_time_amt_2 = sn(document.calc.one_time_amt_2.value);

      var v_one_time_age_2 = sn(document.calc.one_time_age_2.value);



      var v_one_time_amt_3 = sn(document.calc.one_time_amt_3.value);

      var v_one_time_age_3 = sn(document.calc.one_time_age_3.value);



      var v_one_time_amt_4 = sn(document.calc.one_time_amt_4.value);

      var v_one_time_age_4 = sn(document.calc.one_time_age_4.value);





      /* REDUCTION IN RETIREMENT INCOME NEEDS */

      var v_reduce_ret_inc_yrs = sn(document.calc.reduce_ret_inc_yrs.value);

      var v_reduce_ret_inc_perc = sn(document.calc.reduce_ret_inc_perc.value);

      var reduce_perc = Number(1) - Number(v_reduce_ret_inc_perc / 100);

      var reduce_period = 0;





      /* RETIREMENT NEED ADJUSTMENTS */

      var adj_need = 0;



      /* TOTAL OF WITHDRAWELS */

      var accum_draw = 0;





      /* SHORTFALL */

      var accum_shortfall = 0;



      /* ESTATE */

      var v_estate = sn(document.calc.estate.value);



      /* PRESENT VALUES OF NEEDS */

      var per_npv = 0;

      var ret_yr = 0;

      var v_ret_fund = 0;

      var v_accum_npv = 0;







      var row="<table width='90%' border='1' cellspacing='0' cellpadding='2' bordercolor='CCCCCC'>";

      row += "<tr bgcolor='#D3DCE3'>";

      row += "<td align='center'>";

      row += "<font face='arial'><strong><small>Year</small></strong></font>";

      row += "</td>";

      row += "<td align='center'>";

      row += "<font face='arial'><strong><small>Age</small></strong></font>";

      row += "</td>";



      row += "<td align='center'>";

      row += "<font face='arial'><strong><small>Year<br />Begin<br />Balance</small></strong></font>";

      row += "</td>";

      row += "<td align='center'>";

      row += "<font face='arial'><strong><small>Contri-<br />butions</small></strong></font>";

      row += "</td>";

      row += "<td align='center'>";

      row += "<font face='arial'><strong><small>Interest<br />Earnings</small></strong></font>";

      row += "</td>";

      /* row += "<td align='center'>"; */

      /* row += "<font face='arial'><strong><small>I Fact</small></strong></font>"; */

      /* row += "</td>"; */

      row += "<td align='center'>";

      row += "<font face='arial'><strong><small>Inflated<br />Need</small></strong></font>";

      row += "</td>";

      row += "<td align='center'>";

      row += "<font face='arial'><strong><small>Need<br />Reductions<br />(Income)</small></strong></font>";

      row += "</td>";

      row += "<td align='center'>";

      row += "<font face='arial'><strong><small>Adjusted<br />Need</small></strong></font>";

      row += "</td>";

      row += "<td align='center'>";

      row += "<font face='arial'><strong><small>Pre-tax<br />Need</small></strong></font>";

      row += "</td>";

      row += "<td align='center'>";

      row += "<font face='arial'><strong><small>Net<br />Present<br />Value</small></strong></font>";

      row += "</td>";

      row += "<td align='center'>";

      row += "<font face='arial'><strong><small>Year<br />End<br />Balance</small></strong></font>";

      row += "</td>";

      row += "</tr>";



      for(var i = 1; i<=rep_yrs+1; i++) {





         ann_contrib = 0;

         ret_inc = 0;



         if(v_ret_1_col_start == 0) {

            accum_ret_1_col = accum_ret_1_col * ret_1_col;

         }

         if(v_ret_2_col_start == 0) {

            accum_ret_2_col = accum_ret_2_col * ret_2_col;

         }

         if(v_ret_3_col_start == 0) {

            accum_ret_3_col = accum_ret_3_col * ret_3_col;

         }



         /* PRE RETIREMENT */

         if(i<=v_pre_yrs) {



            if(i==1) {

               ann_contrib = 0;

               beg_bal = cur_savings_tot;

               end_bal = beg_bal;

               accum_infl_fact = 1;

            } else {

               beg_bal = end_bal;

               accum_infl_fact = accum_infl_fact * ann_infl_mult;

               if(age_1 < v_stop_contrib_1) {

                  ann_contrib += (v_cur_contrib_1 * 12);

               }

            }



            /* 10/25/2012 */

            /* ONE-TIME BENEFITS */

            if(v_one_time_age_1 == age_1) {

               ann_contrib += v_one_time_amt_1;

            }

            if(v_one_time_age_2 == age_1) {

               ann_contrib += v_one_time_amt_2;

            }

            if(v_one_time_age_3 == age_1) {

               ann_contrib += v_one_time_amt_3;

            }

            if(v_one_time_age_4 == age_1) {

               ann_contrib += v_one_time_amt_4;

            }



            end_bal += ann_contrib;

            ann_int_earn = beg_bal * int;



            end_bal += ann_int_earn;

            v_ret_fund = end_bal;



            infl_ann_inc = v_ann_ret_inc * accum_infl_fact;



            row += "<tr>";

            row += "<td align='right'>";

            row += "<font face='arial'><small>" + cur_yr + "</small></font>";

            row += "</td>";

            row += "<td align='right'>";

            row += "<font face='arial'><small>" + age_1 + "</small></font>";

            row += "</td>";


            row += "<td align='right'>";

            row += "<font face='arial'><small>" + fn(beg_bal,0,1) + "</small></font>";

            row += "</td>";

            row += "<td align='right'>";

            row += "<font face='arial'><small>" + fn(ann_contrib,0,1) + "</small></font>";

            row += "</td>";

            row += "<td align='right'>";

            row += "<font face='arial'><small>" + fn(ann_int_earn,0,1) + "</small></font>";

            row += "</td>";

            /* row += "<td align='right'>"; */

            /* row += "<font face='arial'><small>" + fn(accum_infl_fact,4,0) + "</small></font>"; */

            /* row += "</td>"; */

            row += "<td align='right'>";

            row += "<font face='arial'><small>" + fn(infl_ann_inc,0,1) + "</small></font>";

            row += "</td>";

            row += "<td align='right'>";

            row += " ";

            row += "</td>";

            row += "<td align='right'>";

            row += " ";

            row += "</td>";

            row += "<td align='right'>";

            row += " ";

            row += "</td>";

            row += "<td align='right'>";

            row += " ";

            row += "</td>";

            row += "<td align='right'>";

            row += "<font face='arial'><small>" + fn(end_bal,0,1) + "</small></font>";

            row += "</td>";

            row += "</tr>";





         /* POST RETIREMENT */

         } else {







            reduce_period += 1;

            ret_yr += 1;



            beg_bal = end_bal;



            if(age_1 < v_stop_contrib_1) {

               ann_contrib += (v_cur_contrib_1 * 12);

            }



            if(reduce_period > v_reduce_ret_inc_yrs) {

               v_ann_ret_inc = v_ann_ret_inc * reduce_perc;

               reduce_period = 1;

            }



            accum_infl_fact = accum_infl_fact * ann_infl_mult;

            infl_ann_inc = v_ann_ret_inc * accum_infl_fact;



            if(v_ret_1_col_start == 1) {

               accum_ret_1_col = accum_ret_1_col * ret_1_col;

            }



            if(v_ret_inc_1_1 > 0 && age_1 >= v_ret_1_start_age_1 && age_1 <= v_ret_1_stop_age_1) {

               ret_inc += (v_ret_inc_1_1 * 12 * accum_ret_1_col);

            }





            if(v_ret_2_col_start == 1) {

               accum_ret_2_col = accum_ret_2_col * ret_2_col;

            }



            if(v_ret_inc_2_1 > 0 && age_1 >= v_ret_2_start_age_1 && age_1 <= v_ret_2_stop_age_1) {

               ret_inc += (v_ret_inc_2_1 * 12 * accum_ret_2_col);

            }





            if(v_ret_3_col_start == 1) {

               accum_ret_3_col = accum_ret_3_col * ret_3_col;

            }





            if(v_ret_inc_3_1 > 0 && age_1 >= v_ret_3_start_age_1 && age_1 <= v_ret_3_stop_age_1) {

               ret_inc += (v_ret_inc_3_1 * 12 * accum_ret_3_col);

            }





            /* ONE-TIME BENEFITS */

            if(v_one_time_age_1 == age_1) {

               ret_inc += v_one_time_amt_1;

            }

            if(v_one_time_age_2 == age_1) {

               ret_inc += v_one_time_amt_2;

            }

            if(v_one_time_age_3 == age_1) {

               ret_inc += v_one_time_amt_3;

            }

            if(v_one_time_age_4 == age_1) {

               ret_inc += v_one_time_amt_4;

            }





            adj_need = Number(infl_ann_inc) - Number(ret_inc);



            if(adj_need > 0) {

               tax_ann_inc = adj_need / (Number(1) - Number(tax_perc));

            } else {

               tax_ann_inc = adj_need;

            }



            per_npv = PVsingleAmt(tax_ann_inc, v_rate, ret_yr, 1);

            v_accum_npv += per_npv;





            accum_draw += tax_ann_inc;

            end_bal -= tax_ann_inc;



            if(end_bal < 0) {



               accum_shortfall += end_bal;

               ann_int_earn = 0;

               end_bal = 0;



            } else {



               ann_int_earn = beg_bal * int;

               end_bal += ann_int_earn;

            }



            row += "<tr>";

            row += "<td align='right'>";

            row += "<font face='arial'><small>" + cur_yr + "</small></font>";

            row += "</td>";

            row += "<td align='right'>";

            if(age_1 == 200) {

               row += " ";

            } else {

               row += "<font face='arial'><small>" + age_1 + "</small></font>";

            }

            row += "</td>";


            row += "<td align='right'>";

            row += "<font face='arial'><small>" + fn(beg_bal,0,1) + "</small></font>";

            row += "</td>";

            row += "<td align='right'>";

            row += "<font face='arial'><small>" + fn(ann_contrib,0,1) + "</small></font>";

            row += "</td>";

            row += "<td align='right'>";

            row += "<font face='arial'><small>" + fn(ann_int_earn,0,1) + "</small></font>";

            row += "</td>";

            /* row += "<td align='right'>"; */

            /* row += "<font face='arial'><small>" + fn(accum_infl_fact,4,0) + "</small></font>"; */

            /* row += "</td>"; */

            row += "<td align='right'>";

            row += "<font face='arial'><small>" + fn(infl_ann_inc,0,1) + "</small></font>";

            row += "</td>";

            row += "<td align='right'>";

            row += "<font face='arial'><small>" + fn(ret_inc,0,1) + "</small></font>";

            row += "</td>";

            row += "<td align='right'>";

            row += "<font face='arial'><small>" + fn(adj_need,0,1) + "</small></font>";

            row += "</td>";

            row += "<td align='right'>";

            row += "<font face='arial'><small>" + fn(tax_ann_inc,0,1) + "</small></font>";

            row += "</td>";

            row += "<td align='right'>";

            row += "<font face='arial'><small>" + fn(per_npv,0,1) + "</small></font>";

            row += "</td>";

            row += "<td align='right'>";

            row += "<font face='arial'><small>" + fn(end_bal,0,1) + "</small></font>";

            row += "</td>";

            row += "</tr>";











         }





         cur_yr += 1;



         if(age_1+1 > v_life_age_1) {

            age_1 = 200;

         } else {

            age_1 += 1;

         }





      }







      row += "</table>";





      sched_area.innerHTML = row;



      accum_shortfall -= v_estate;



      /* ESTATE FIX 02/11/2011**************************** */

      if(v_estate > 0) {

         var v_npv_estate = PVsingleAmt(v_estate, v_rate, ret_yr, 1);

         v_accum_npv += v_npv_estate;

      }

      /* ************************************************* */



      /* document.calc.shortfall.value = fn(accum_shortfall,0,1); */



      if(accum_shortfall < 0) {

         var v_gap = accum_shortfall * -1;



         /* var v_shortfall_contrib = mo_save(v_rate, v_gap, v_pre_yrs); */

         /* var v_shortfall_contrib = mo_save(7,735787,16); */

         /* document.calc.surp_short.value = fn(v_shortfall_contrib,0,1); */



      }



         document.calc.accum_npv.value = "$" + fn(v_accum_npv,0,1);



         document.calc.ret_fund.value = "$" + fn(v_ret_fund,0,1);



         var v_save_gap = Number(v_ret_fund) - Number(v_accum_npv);

         document.calc.save_gap.value = "$" + fn(v_save_gap,0,1);

         if(v_save_gap < 0) {

            v_save_gap = v_save_gap * -1;

         } else {

            v_save_gap = 0;



         }



         var save_yrs = Number(v_pre_yrs) - Number(1);

         var ann_add_contrib = mo_save(v_rate, v_save_gap, save_yrs);

         var v_add_contrib = ann_add_contrib / 12;

         document.calc.add_contrib.value = "$" + fn(v_add_contrib,0,1);



         var v_now_contrib = Number(v_cur_contrib_1);

         document.calc.now_contrib.value = "$" + fn(v_now_contrib,0,1);



         var v_tot_contrib = Number(v_add_contrib) + Number(v_now_contrib);

         document.calc.tot_contrib.value = "$" + fn(v_tot_contrib,0,1);



   }



}



function clear_results(form) {



   document.calc.accum_npv.value = "";

   document.calc.ret_fund.value = "";

   document.calc.save_gap.value = "";

   document.calc.add_contrib.value = "";

   document.calc.now_contrib.value = "";

   document.calc.tot_contrib.value = "";



   var sched_area = document.getElementById("sched_div");

   sched_area.innerHTML = "";

}





function reset_calc(form) {



   if(confirm("Are you sure you want to clear the calculator?")) {



      var sched_area = document.getElementById("sched_div");

      sched_area.innerHTML = "";



      document.calc.reset();



      document.calc.now_age_1.focus();



   }

}





function help(help_id,fld) {





   var help_ar = new Array();

   help_ar[0] = "";

   help_ar[1] = "Enter your age at the end of the current year. If you are creating this plan for more than one person, enter the age of the oldest person.";

   help_ar[2] = "Enter the age you plan to retire at. If you are creating this plan for more than one person, enter the retirement age for the oldest person.";

   help_ar[3] = "Enter the age you expect to live to. If you are creating this plan for more than one person, enter the life-expectancy age of the person expected to live the longest.";

   help_ar[4] = "Enter the desired annual household retirement income, without adjusting for inflation.";

   help_ar[5] = "If you believe your retirement income needs will decrease as your retirement years pass, enter number of years between need reductions. Otherwise, leave blank.";

   help_ar[6] = "If you believe your retirement income needs will decrease as your retirement years pass, enter reduction percentage here. Otherwise, leave blank.";

   help_ar[7] = "If you would like to leave an estate to your hiers, enter the dollar amount here. Your retirement savings will deplete to this value instead of zero.";

   help_ar[8] = "Enter the expected average annual rate of inflation between now and the end of your retirement plan.";





   help_ar[9] = "Enter the amount of your current retirement savings.";

   help_ar[10] = "Enter the amount of your current monthly contributions to your retirement fund.";

   help_ar[11] = "Enter the age you plan to stop making contributions to your retirement fund.";

   help_ar[12] = "Enter the annual interest rate you expect to earn on your retirement investment. Enter as a whole number (for 6.5% enter 6.5).";

   help_ar[13] = "Enter your projected combined Federal and State income tax rate percentage during your retirement.";







   help_ar[14] = "If you would like to give this one-time benefit a name for the report, you can do so in this field.";

   help_ar[15] = "If expect to receive a one-time addition to your retirement fund (sale of home, etc.), enter the amount here. IMPORTANT: In order to have this one-time benefit included in the calculations, you must enter both the amount and the age you expect to receive it in the field below.";

   help_ar[16] = "Enter the age you expect to add the one-time benefit amount to your retirement fund.";



   help_ar[17] = "If you would like to give this one-time benefit a name for the report, you can do so in this field.";

   help_ar[18] = "If expect to receive a one-time addition to your retirement fund (sale of home, etc.), enter the amount here. IMPORTANT: In order to have this one-time benefit included in the calculations, you must enter both the amount and the age you expect to receive it in the field below.";

   help_ar[19] = "Enter the age you expect to add the one-time benefit amount to your retirement fund.";



   help_ar[20] = "If you would like to give this one-time benefit a name for the report, you can do so in this field.";

   help_ar[21] = "If expect to receive a one-time addition to your retirement fund (sale of home, etc.), enter the amount here. IMPORTANT: In order to have this one-time benefit included in the calculations, you must enter both the amount and the age you expect to receive it in the field below.";

   help_ar[22] = "Enter the age you expect to add the one-time benefit amount to your retirement fund.";



   help_ar[23] = "If you would like to give this one-time benefit a name for the report, you can do so in this field.";

   help_ar[24] = "If expect to receive a one-time addition to your retirement fund (sale of home, etc.), enter the amount here. IMPORTANT: In order to have this one-time benefit included in the calculations, you must enter both the amount and the age you expect to receive it in the field below.";

   help_ar[25] = "Enter the age you expect to add the one-time benefit amount to your retirement fund.";



   help_ar[26] = "If you would like to give this retirement income a name for the report, you can do so in this field.";

   help_ar[27] = "Retirement Income #1: If you expect this retirement income to receive an annual COLA (Cost of Living Adjustment), enter the percentage here. Otherwise, leave blank.";

   help_ar[28] = "Retirement Income #1: If you expect this retirement income to receive an annual COLA (Cost of Living Adjustment), choose when the annual COLA should begin.";

   help_ar[29] = "Retirement Income #1: Enter the monthly amount for this expected retirement income. IMPORTANT: In order to have this income included in the calculations, you must enter both a start and a stop age in the fields below.";

   help_ar[30] = "Retirement Income #1: Enter the age to begin this expected monthly retirement income. Must be greater than or equal to retirement age entered in top section.";

   help_ar[31] = "Retirement Income #1: Enter the age to end this expected retirement income.";



   help_ar[32] = "If you would like to give this retirement income a name for the report, you can do so in this field.";

   help_ar[33] = "Retirement Income #2: If you expect this retirement income to receive an annual COLA (Cost of Living Adjustment), enter the percentage here. Otherwise, leave blank.";

   help_ar[34] = "Retirement Income #2: If you expect this retirement income to receive an annual COLA (Cost of Living Adjustment), choose when the annual COLA should begin.";

   help_ar[35] = "Retirement Income #2: Enter the monthly amount for this expected retirement income. IMPORTANT: In order to have this income included in the calculations, you must enter both a start and a stop age in the fields below.";

   help_ar[36] = "Retirement Income #2: Enter the age to begin this expected monthly retirement income. Must be greater than or equal to retirement age entered in top section.";

   help_ar[37] = "Retirement Income #2: Enter the age to end this expected retirement income.";



   help_ar[38] = "If you would like to give this retirement income a name for the report, you can do so in this field.";

   help_ar[39] = "Retirement Income #3: If you expect this retirement income to receive an annual COLA (Cost of Living Adjustment), enter the percentage here. Otherwise, leave blank.";

   help_ar[40] = "Retirement Income #3: If you expect this retirement income to receive an annual COLA (Cost of Living Adjustment), choose when the annual adjustment should begin.";

   help_ar[41] = "Retirement Income #3: Enter the monthly amount for this expected retirement income. IMPORTANT: In order to have this income included in the calculations, you must enter both a start and a stop age in the fields below.";

   help_ar[42] = "Retirement Income #3: Enter the age to begin this expected monthly retirement income. Must be greater than or equal to retirement age entered in top section.";

   help_ar[43] = "Retirement Income #3: Enter the age to end this expected retirement income.";



   help_ar[44] = "This is the amount you will need to have saved by retirement age in order to fund your retirement plan.";

   help_ar[45] = "Based on your current savings, current contributions and expected annual return on your retirement investments, this is how much you will have saved by retirement age.";

   help_ar[46] = "This is the difference between how much you will need to have saved and how much you will have saved based on your present entries. A positive number represents a surplus, whereas a negative number represents a shortfall.";

   help_ar[47] = "If your retirement plan shows a shortfall, this is the additional monthly contributions you will need to start making now in order to fully fund your retirement plan.";

   help_ar[48] = "This is your current monthly contributions.";

   help_ar[49] = "This is the total monthly contributions you need to start making now in order to fully fund your plan.";







   var help_cell = document.getElementById("help_" + help_id + "");

   help_cell.innerHTML = "<font face='arial'><small>" + help_ar[fld] + "</small></font>";



   for(var i = 1; i<6; i++) {



      if(i != help_id) {



         var clear_cell = document.getElementById("help_" + i + "");

         clear_cell.innerHTML = "";

      }

   }



}



function create_report(form) {



   var rep_rows = "<table width='90%' border='1' cellspacing='0' cellpadding='2' bordercolor='CCCCCC'>";



   rep_rows += "<tr bgcolor='#D3DCE3'>";

   rep_rows += "<td colspan='3'>";

   rep_rows += "<font face='arial'><strong>Retirement Needs</strong></font>";

   rep_rows += "</td>";

   rep_rows += "</tr>";



   rep_rows += "<tr>";

   rep_rows += "<td>";

   rep_rows += "<font face='tahoma'><small>";

   rep_rows += "Age at the end of current year";

   rep_rows += "</small></font>";

   rep_rows += "</td>";

   rep_rows += "<td align='right'>";

   rep_rows += "<font face='tahoma'><small>" + fn(sn(document.calc.now_age_1.value),0,0) + "</small></font>";

   rep_rows += "</td>";

   rep_rows += "</tr>";



   rep_rows += "<tr>";

   rep_rows += "<td>";

   rep_rows += "<font face='tahoma'><small>";

   rep_rows += "Age you plan to retire at";

   rep_rows += "</small></font>";

   rep_rows += "</td>";

   rep_rows += "<td align='right'>";

   rep_rows += "<font face='tahoma'><small>" + fn(sn(document.calc.retire_age_1.value),0,0) + "</small></font>";

   rep_rows += "</td>";

   rep_rows += "</tr>";



   rep_rows += "<tr>";

   rep_rows += "<td>";

   rep_rows += "<font face='tahoma'><small>";

   rep_rows += "Life expectancy";

   rep_rows += "</small></font>";

   rep_rows += "</td>";

   rep_rows += "<td align='right'>";

   rep_rows += "<font face='tahoma'><small>" + fn(sn(document.calc.life_age_1.value),0,0) + "</small></font>";

   rep_rows += "</td>";

   rep_rows += "</tr>";



   rep_rows += "<tr>";

   rep_rows += "<td>";

   rep_rows += "<font face='tahoma'><small>";

   rep_rows += "Desired annual retirement income";

   rep_rows += "</small></font>";

   rep_rows += "</td>";

   rep_rows += "<td align='right'>";

   rep_rows += "<font face='tahoma'><small>$" + fn(sn(document.calc.ann_ret_inc.value),0,1) + "</small></font>";

   rep_rows += "</td>";

   rep_rows += "</tr>";



   if(sn(document.calc.reduce_ret_inc_yrs.value) > 0 && sn(document.calc.reduce_ret_inc_perc.value) > 0) {

      rep_rows += "<tr>";

      rep_rows += "<td>";

      rep_rows += "<font face='tahoma'><small>";

      rep_rows += "Every " + document.calc.reduce_ret_inc_yrs.value + " years of retirement, reduce our income need by this percentage";

      rep_rows += "</small></font>";

      rep_rows += "</td>";

      rep_rows += "<td align='right'>";

      rep_rows += "<font face='tahoma'><small>" + fn(sn(document.calc.reduce_ret_inc_perc.value),2,0) + "%</small></font>";

      rep_rows += "</td>";

      rep_rows += "</tr>";

   }



   rep_rows += "<tr>";

   rep_rows += "<td>";

   rep_rows += "<font face='tahoma'><small>";

   rep_rows += "Desired estate";

   rep_rows += "</small></font>";

   rep_rows += "</td>";

   rep_rows += "<td align='right'>";

   rep_rows += "<font face='tahoma'><small>$" + fn(sn(document.calc.estate.value),0,1) + "</small></font>";

   rep_rows += "</td>";

   rep_rows += "</tr>";



   rep_rows += "<tr>";

   rep_rows += "<td>";

   rep_rows += "<font face='tahoma'><small>";

   rep_rows += "Expected average annual rate of inflation";

   rep_rows += "</small></font>";

   rep_rows += "</td>";

   rep_rows += "<td align='right'>";

   rep_rows += "<font face='tahoma'><small>" + fn(sn(document.calc.inflate.value),2,0) + "%</small></font>";

   rep_rows += "</td>";

   rep_rows += "</tr>";



   rep_rows += "<tr bgcolor='#D3DCE3'>";

   rep_rows += "<td colspan='3'>";

   rep_rows += "<font face='arial'><strong>Retirement Funding</strong></font>";

   rep_rows += "</td>";

   rep_rows += "</tr>";



   rep_rows += "<tr>";

   rep_rows += "<td>";

   rep_rows += "<font face='tahoma'><small>";

   rep_rows += "Current retirement savings";

   rep_rows += "</small></font>";

   rep_rows += "</td>";

   rep_rows += "<td align='right'>";

   rep_rows += "<font face='tahoma'><small>$" + fn(sn(document.calc.cur_savings_1.value),0,1) + "</small></font>";

   rep_rows += "</td>";

   rep_rows += "</tr>";



   rep_rows += "<tr>";

   rep_rows += "<td>";

   rep_rows += "<font face='tahoma'><small>";

   rep_rows += "Current monthly contributions";

   rep_rows += "</small></font>";

   rep_rows += "</td>";

   rep_rows += "<td align='right'>";

   rep_rows += "<font face='tahoma'><small>$" + fn(sn(document.calc.cur_contrib_1.value),0,1) + "</small></font>";

   rep_rows += "</td>";

   rep_rows += "</tr>";



   rep_rows += "<tr>";

   rep_rows += "<td>";

   rep_rows += "<font face='tahoma'><small>";

   rep_rows += "Age to stop contributions";

   rep_rows += "</small></font>";

   rep_rows += "</td>";

   rep_rows += "<td align='right'>";

   rep_rows += "<font face='tahoma'><small>" + fn(sn(document.calc.stop_contrib_1.value),0,0) + "</small></font>";

   rep_rows += "</td>";

   rep_rows += "</tr>";



   rep_rows += "<tr>";

   rep_rows += "<td>";

   rep_rows += "<font face='tahoma'><small>";

   rep_rows += "Annual Interest Rate you expect to earn";

   rep_rows += "</small></font>";

   rep_rows += "</td>";

   rep_rows += "<td align='right'>";

   rep_rows += "<font face='tahoma'><small>" + fn(sn(document.calc.rate.value),2,0) + "%</small></font>";

   rep_rows += "</td>";

   rep_rows += "</tr>";



   rep_rows += "<tr>";

   rep_rows += "<td>";

   rep_rows += "<font face='tahoma'><small>";

   rep_rows += "Combined Federal & State Tax Rate during retirement";

   rep_rows += "</small></font>";

   rep_rows += "</td>";

   rep_rows += "<td align='right'>";

   rep_rows += "<font face='tahoma'><small>" + fn(sn(document.calc.tax_rate.value),2,0) + "%</small></font>";

   rep_rows += "</td>";

   rep_rows += "</tr>";



   rep_rows += "<tr  class='ChartColHead1'>";

   rep_rows += "<td colspan='3'>";

   rep_rows += "Lump Sum Contributions";

   rep_rows += "</td>";

   rep_rows += "</tr>";



   rep_rows += "<tr bgcolor='#D3DCE3'>";

   rep_rows += "<td colspan='3'>";

   rep_rows += "<font face='arial'><strong>One Time Benefits</strong></font>";

   rep_rows += "</td>";

   rep_rows += "</tr>";



   if(sn(document.calc.one_time_amt_1.value) > 0 && sn(document.calc.one_time_age_1.value) > 0) {

      rep_rows += "<tr>";

      rep_rows += "<td>";

      rep_rows += "<font face='tahoma'><small>";

      rep_rows += "" + document.calc.one_time_amt_name_1.value + " at age " + document.calc.one_time_age_1.value + "";

      rep_rows += "</small></font>";

      rep_rows += "</td>";

      rep_rows += "<td>";

      rep_rows += "<font face='tahoma'><small>";

      rep_rows += "$" + fn(sn(document.calc.one_time_amt_1.value),0,0) + "";

      rep_rows += "</small></font>";

      rep_rows += "</td>";

      rep_rows += "</tr>";

   }

   if(sn(document.calc.one_time_amt_2.value) > 0 && sn(document.calc.one_time_age_2.value) > 0) {

      rep_rows += "<tr>";

      rep_rows += "<td>";

      rep_rows += "<font face='tahoma'><small>";

      rep_rows += "" + document.calc.one_time_amt_name_2.value + " at age " + document.calc.one_time_age_2.value + "";

      rep_rows += "</small></font>";

      rep_rows += "</td>";

      rep_rows += "<td>";

      rep_rows += "<font face='tahoma'><small>";

      rep_rows += "$" + fn(sn(document.calc.one_time_amt_2.value),0,0) + "";

      rep_rows += "</small></font>";

      rep_rows += "</td>";

      rep_rows += "</tr>";

   }

   if(sn(document.calc.one_time_amt_3.value) > 0 && sn(document.calc.one_time_age_3.value) > 0) {

      rep_rows += "<tr>";

      rep_rows += "<td>";

      rep_rows += "<font face='tahoma'><small>";

      rep_rows += "" + document.calc.one_time_amt_name_3.value + " at age " + document.calc.one_time_age_3.value + "";

      rep_rows += "</small></font>";

      rep_rows += "</td>";

      rep_rows += "<td>";

      rep_rows += "<font face='tahoma'><small>";

      rep_rows += "$" + fn(sn(document.calc.one_time_amt_3.value),0,0) + "";

      rep_rows += "</small></font>";

      rep_rows += "</td>";

      rep_rows += "</tr>";

   }

   if(sn(document.calc.one_time_amt_4.value) > 0 && sn(document.calc.one_time_age_4.value) > 0) {

      rep_rows += "<tr>";

      rep_rows += "<td>";

      rep_rows += "<font face='tahoma'><small>";

      rep_rows += "" + document.calc.one_time_amt_name_4.value + " at age " + document.calc.one_time_age_4.value + "";

      rep_rows += "</small></font>";

      rep_rows += "</td>";

      rep_rows += "<td>";

      rep_rows += "<font face='tahoma'><small>";

      rep_rows += "$" + fn(sn(document.calc.one_time_amt_4.value),0,0) + "";

      rep_rows += "</small></font>";

      rep_rows += "</td>";

      rep_rows += "</tr>";

   }



   rep_rows += "<tr bgcolor='#D3DCE3'>";

   rep_rows += "<td colspan='3'>";

   rep_rows += "<font face='arial'><strong>Post-Retirement Income (Pension, SS, Wages, etc.)</strong></font>";

   rep_rows += "</td>";

   rep_rows += "</tr>";





   if(sn(document.calc.ret_inc_1_1.value) > 0 &&

   sn(document.calc.ret_1_start_age_1.value) > 0 &&

   sn(document.calc.ret_1_stop_age_1.value) > 0) {

      rep_rows += "<tr>";

      rep_rows += "<td>";

      rep_rows += "<font face='tahoma'><small>";

      rep_rows += "" + document.calc.ret_1_name.value + ": Monthly from ";

      rep_rows += "age " + fn(sn(document.calc.ret_1_start_age_1.value),0,0) + " to ";

      rep_rows += "age " + fn(sn(document.calc.ret_1_stop_age_1.value),0,0) + ", ";

      rep_rows += "" + fn(sn(document.calc.ret_1_col.value),1,0) + "% COL starting ";

      rep_rows += "" + document.calc.ret_1_col_start.options[document.calc.ret_1_col_start.selectedIndex].text + "";

      rep_rows += "</small></font>";

      rep_rows += "</td>";

      rep_rows += "<td align='right'>";

      rep_rows += "<font face='tahoma'><small>$" + fn(sn(document.calc.ret_inc_1_1.value),2,0) + "</small></font>";

      rep_rows += "</td>";

      rep_rows += "</tr>";

   }



   if(sn(document.calc.ret_inc_2_1.value) > 0 &&

   sn(document.calc.ret_2_start_age_1.value) > 0 &&

   sn(document.calc.ret_2_stop_age_1.value) > 0) {

      rep_rows += "<tr>";

      rep_rows += "<td>";

      rep_rows += "<font face='tahoma'><small>";

      rep_rows += "" + document.calc.ret_2_name.value + ": Monthly from ";

      rep_rows += "age " + fn(sn(document.calc.ret_2_start_age_1.value),0,0) + " to ";

      rep_rows += "age " + fn(sn(document.calc.ret_2_stop_age_1.value),0,0) + ", ";

      rep_rows += "" + fn(sn(document.calc.ret_2_col.value),1,0) + "% COL starting ";

      rep_rows += "" + document.calc.ret_2_col_start.options[document.calc.ret_2_col_start.selectedIndex].text + "";

      rep_rows += "</small></font>";

      rep_rows += "</td>";

      rep_rows += "<td align='right'>";

      rep_rows += "<font face='tahoma'><small>$" + fn(sn(document.calc.ret_inc_2_1.value),2,0) + "</small></font>";

      rep_rows += "</td>";

      rep_rows += "</tr>";

   }



   if(sn(document.calc.ret_inc_3_1.value) > 0 &&

   sn(document.calc.ret_3_start_age_1.value) > 0 &&

   sn(document.calc.ret_3_stop_age_1.value) > 0) {

      rep_rows += "<tr>";

      rep_rows += "<td>";

      rep_rows += "<font face='tahoma'><small>";

      rep_rows += "" + document.calc.ret_3_name.value + ": Monthly from ";

      rep_rows += "age " + fn(sn(document.calc.ret_3_start_age_1.value),0,0) + " to ";

      rep_rows += "age " + fn(sn(document.calc.ret_3_stop_age_1.value),0,0) + ", ";

      rep_rows += "" + fn(sn(document.calc.ret_3_col.value),1,0) + "% COL starting ";

      rep_rows += "" + document.calc.ret_3_col_start.options[document.calc.ret_3_col_start.selectedIndex].text + "";

      rep_rows += "</small></font>";

      rep_rows += "</td>";

      rep_rows += "<td align='right'>";

      rep_rows += "<font face='tahoma'><small>$" + fn(sn(document.calc.ret_inc_3_1.value),2,0) + "</small></font>";

      rep_rows += "</td>";

      rep_rows += "</tr>";

   }





   rep_rows += "<tr bgcolor='#D3DCE3'>";

   rep_rows += "<td colspan='3'>";

   rep_rows += "<font face='arial'><strong>Results</strong></font>";

   rep_rows += "</td>";

   rep_rows += "</tr>";



   rep_rows += "<tr>";

   rep_rows += "<td>";

   rep_rows += "<font face='tahoma'><small>";

   rep_rows += "Savings Needed at Retirement Age";

   rep_rows += "</small></font>";

   rep_rows += "</td>";

   rep_rows += "<td align='right'>";

   rep_rows += "<font face='tahoma'><small>" + document.calc.accum_npv.value + "</small></font>";

   rep_rows += "</td>";

   rep_rows += "</tr>";



   rep_rows += "<tr>";

   rep_rows += "<td>";

   rep_rows += "<font face='tahoma'><small>";

   rep_rows += "Savings at Retirement Based on Present Entries";

   rep_rows += "</small></font>";

   rep_rows += "</td>";

   rep_rows += "<td align='right'>";

   rep_rows += "<font face='tahoma'><small>" + document.calc.ret_fund.value + "</small></font>";

   rep_rows += "</td>";

   rep_rows += "</tr>";



   rep_rows += "<tr>";

   rep_rows += "<td>";

   rep_rows += "<font face='tahoma'><small>";

   rep_rows += "Savings Surplus (negative number indicates a ShortFall)";

   rep_rows += "</small></font>";

   rep_rows += "</td>";

   rep_rows += "<td align='right'>";

   rep_rows += "<font face='tahoma'><small>" + document.calc.save_gap.value + "</small></font>";

   rep_rows += "</td>";

   rep_rows += "</tr>";



   rep_rows += "<tr>";

   rep_rows += "<td>";

   rep_rows += "<font face='tahoma'><small>";

   rep_rows += "Additional Monthly Contribution Needed to Fully Fund Plan";

   rep_rows += "</small></font>";

   rep_rows += "</td>";

   rep_rows += "<td align='right'>";

   rep_rows += "<font face='tahoma'><small>" + document.calc.add_contrib.value + "</small></font>";

   rep_rows += "</td>";

   rep_rows += "</tr>";



   rep_rows += "<tr>";

   rep_rows += "<td>";

   rep_rows += "<font face='tahoma'><small>";

   rep_rows += "Present Monthly Contributions";

   rep_rows += "</small></font>";

   rep_rows += "</td>";

   rep_rows += "<td align='right'>";

   rep_rows += "<font face='tahoma'><small>" + document.calc.now_contrib.value + "</small></font>";

   rep_rows += "</td>";

   rep_rows += "</tr>";





   rep_rows += "<tr>";

   rep_rows += "<td>";

   rep_rows += "<font face='tahoma'><small>";

   rep_rows += "Total Monthly Contribution Needed to Fully Fund Plan";

   rep_rows += "</small></font>";

   rep_rows += "</td>";

   rep_rows += "<td align='right'>";

   rep_rows += "<font face='tahoma'><small>" + document.calc.tot_contrib.value + "</small></font>";

   rep_rows += "</td>";

   rep_rows += "</tr>";









   rep_rows += "</table><br /><br />";



   var sched_area = document.getElementById("sched_div");

   var sched_tbl = sched_area.innerHTML;



   var part_1 = "<head><title>Retirement Planning Report</title></head>";

   part_1 += "<";

   part_1 += "bo";

   part_1 += "dy ";

   part_1 += "bgcolor='#FFFFFF'>";

   part_1 += "<br /><center>";





   part_1 += "<font face='arial'><big><strong>Retirement Planning Report</strong></big></font><br />";

   part_1 += "<font face='arial'><small><strong>" + document.calc.report_date.value + "</strong></small></font><br /><br />";



   var part_4 = "<form method='post'>";

   part_4 += "<input type='button' value='Print Report' onClick='window.print()'>";

   part_4 += "<br /><input type='button' value='Close Window' onClick='window.close()'>";

   part_4 += "</form></center></body></html>";



   var schedule = (part_1 + "" + rep_rows + "" + sched_tbl + "" + part_4 + "");





   reportWin = window.open("","","width=700,height=500,toolbar=yes,menubar=yes,scrollbars=yes,resizable=yes");

   reportWin.document.write(schedule);

   reportWin.document.close();





}
