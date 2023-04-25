//Filter recommendations

let url = new URL(window.location.href);
let stock_ct = 0;
const product_list = [];
const code = String(url.searchParams.get("code"));

let sex = String(url.searchParams.get("s"));
let age = Number(url.searchParams.get("a"));
let mgr = Number(url.searchParams.get("mgr"));
let fo_r = Number(url.searchParams.get("for"));
let b12r = Number(url.searchParams.get("b12r"));
let vcr = Number(url.searchParams.get("vcr"));
let tr = Number(url.searchParams.get("tr"));
let rec_reason_dict = {
	"Magnesium-1":"To help you cope with anxiety",
	"Magnesium-10":"To help you improve your sleep",
	"Magnesium-11":"To help you with anxiety and sleep",
	"Magnesium-100":"To help with blood pressure",
	"Magnesium-110":"To help with blood pressure and sleep",
	"Magnesium-111":"To help with anxiety, sleep, and blood pressure",
	"Fish Oil-1":"Because you eat < 2 servings of fish per week",
	"Fish Oil-2":"To help with blood pressure or a heart condition",
	"Fish Oil-3":"To help with blood pressure or a heart condition",
	"Vitamin B12-1":"Because vegan and vegetarian diets lack B12",
	"Vitamin B12-2":"Because you reported a deficiency",
	"Vitamin B Complex-1":"Because vegan and vegetarian diets lack B12",
	"Vitamin B Complex-2":"Because you reported a deficiency",
	"Vitamin C-1":"Because smokers often have low vitamin C",
	"Vitamin C-2":"Because you reported a deficiency",
	"Turmeric-1":"To help with metabolic disorder, metabolic syndrome, or diabetes",
	"Turmeric-10":"To help with blood pressure or cholesterol",
	"Turmeric-11":"To help with metabolic disorder, metabolic syndrome, or diabetes",
	"Turmeric-100":"To help with osteoarthritis",
	"Turmeric-110":"To help with osteoarthritis, blood pressure, or cholesterol",
	"Turmeric-111":"To help with metabolic disorder, metabolic syndrome, diabetes, or arthritis"
}
let deficiency_dict = {
"Vitamin D-1":"95% of adult men don't get enough<sup>1</sup>",
"Vitamin D-2":"92% of men over 51 don't get enough<sup>1</sup>",
"Vitamin D-3":">97% of adult women don't get enough<sup>1</sup>",
"Vitamin D-4":">97% of women over 51 don't get enough<sup>1</sup>",
"Vitamin D + Calcium-1":"95% of adult men don't get enough vitamin D<sup>1</sup>",
"Vitamin D + Calcium-2":"92% of men over 51 don't get enough vitamin D<sup>1</sup>",
"Vitamin D + Calcium-3":">97% of adult women don't get enough vitamin D<sup>1</sup>",
"Vitamin D + Calcium-4":">97% of women over 51 don't get enough vitamin D<sup>1</sup>",
"Calcium-1":"22% of adult men don't get enough<sup>1</sup>",
"Calcium-2":"36% of men over 51 don't get enough<sup>1</sup>",
"Calcium-3":"42% of adult women don't get enough<sup>1</sup>",
"Calcium-4":"77% of women over 51 don't get enough<sup>1</sup>",
"Fiber-1":"97% of adult men don't get enough<sup>2</sup>",
"Fiber-2":"92% of men over 51 don't get enough<sup>2</sup>",
"Fiber-3":"94% of adult women don't get enough<sup>2</sup>",
"Fiber-4":"83% of women over 51 don't get enough<sup>2</sup>",
"Magnesium-1":"55% of adult men don't get enough<sup>1</sup>",
"Magnesium-2":"57% of men over 51 don't get enough<sup>1</sup>",
"Magnesium-3":"48% of adult women don't get enough<sup>1</sup>",
"Magnesium-4":"53% of women over 51 don't get enough<sup>1</sup>",
"Fish Oil-1":"Up to 3g of DHA/EPA per day can produce benefit in adult men<sup>4</sup>",
"Fish Oil-2":"Up to 3g of DHA/EPA per day can produce benefit in men over 51<sup>4</sup>",
"Fish Oil-3":"Up to 3g of DHA/EPA per day can produce benefit in adult women<sup>4</sup>",
"Fish Oil-4":"Up to 3g of DHA/EPA per day can produce benefit in women over 51<sup>4</sup>",
"Folic Acid-1":"8% of adult men don't get enough<sup>1</sup>",
"Folic Acid-2":"10% of men over 51 don't get enough<sup>1</sup>",
"Folic Acid-3":"20% of adult women don't get enough<sup>1</sup>",
"Folic Acid-4":"27% of women over 51 don't get enough<sup>1</sup>",
"Prenatal-1":"See why we recommend",
"Prenatal-2":"See why we recommend",
"Prenatal-3":"See why we recommend",
"Prenatal-4":"See why we recommend",
"Vitamin B12-1":"Only 4% of adult men are under the recommended amount<sup>1</sup>",
"Vitamin B12-2":"Only 5% of men over 51 don't get enough<sup>1</sup>",
"Vitamin B12-3":"8% of adult women don't get enough<sup>1</sup>",
"Vitamin B12-4":"9% of women over 51 don't get enough<sup>1</sup>",
"Iodine-1":"Iodine deficiency is uncommon",
"Iodine-2":"Iodine deficiency is uncommon",
"Iodine-3":"Iodine deficiency is uncommon",
"Iodine-4":"Iodine deficiency is uncommon",
"Vitamin C-1":"55% of adult men don't get enough<sup>1</sup>",
"Vitamin C-2":"51% of men over 51 don't get enough<sup>1</sup>",
"Vitamin C-3":"46% of adult women don't get enough<sup>1</sup>",
"Vitamin C-4":"44% of women over 51 don't get enough<sup>1</sup>",
"Iron-1":"Less than 3% of adult men get the recommended amount<sup>1</sup>",
"Iron-2":"Less than 3% of men over 51 are below the recommended intake level<sup>1</sup>",
"Iron-3":"19% of adult women get less than the recommended amount<sup>1</sup>",
"Iron-4":"Less than 3% of women over 51 are below the recommended intake level<sup>1</sup>",
"Vitamin B Complex-1":"Inadequate intakes of B1, B3, B6, and B12 range between 3-4% for adult men<sup>1</sup>",
"Vitamin B Complex-2":"Inadequate intakes of B1, B3, B6, and B12 range between 3-15% for men over 51<sup>1</sup>",
"Vitamin B Complex-3":"Inadequate intakes of B3, B6, and B12 range between 8-10% for adult women<sup>1</sup>",
"Vitamin B Complex-4":"Inadequate intakes of B1, B6, and B12 range between 9-19% for women over 51<sup>1</sup>",
"Turmeric-1":"See why we recommend",
"Turmeric-2":"See why we recommend",
"Turmeric-3":"See why we recommend",
"Turmeric-4":"See why we recommend"
}
let group = -1;
if (sex=="Male"){
	group = 1;
	if (age >=51){
		group = 2;
	}
} if (sex =="Female"){
	group = 3;
	if (age >=51) {
		group = 4;
	}
} 


function assessRecReason(product,xx){

	if (product =="Magnesium"){
		if (mgr > 0) {
			xx.getElementsByClassName("rec-reason")[0].innerText = rec_reason_dict[String(product)+"-"+String(mgr)];
		}
	}
	if (product =="Fish Oil"){
		if (fo_r > 0) {
			xx.getElementsByClassName("rec-reason")[0].innerText = rec_reason_dict[String(product)+"-"+String(fo_r)];
		}
	}
	if (product =="Vitamin B12" || product=="Vitamin B Complex"){
		if (b12r > 0) {
			xx.getElementsByClassName("rec-reason")[0].innerText = rec_reason_dict[String(product)+"-"+String(b12r)];
		}
	}
	if (product =="Vitamin C"){
		if (vcr > 0) {
			xx.getElementsByClassName("rec-reason")[0].innerText = rec_reason_dict[String(product)+"-"+String(vcr)];
		}
	}
	if (product =="Turmeric"){
		if (tr > 0) {
			xx.getElementsByClassName("rec-reason")[0].innerText = rec_reason_dict[String(product)+"-"+String(tr)];
		}
	}
}
function assessDeficiency(product,xx){
	if (group ==-1){
		return;
	}
	let deficiency_text = deficiency_dict[String(product)+"-"+String(group)]
	if (deficiency_text.length>1){

	} xx.getElementsByClassName("deficiency-fact")[0].innerHTML = deficiency_dict[String(product)+"-"+String(group)];
}

if (code[8] == "1"){
	product_list.push("Vitamin D");
} if (code[8] == "2"){
	product_list.push("Vitamin D + Calcium");
} if (code[8] == "3"){
	product_list.push("Vitamin D + Calcium");
} if (code[7] == "1" || code[7] == "3"){
	product_list.push("Fish Oil");
} if (code[7] == "2" || code[7] == "3"){
	product_list.push("Fiber");
} if (code[6] == "1" || code[6] == "3"){
	product_list.push("Magnesium");
} if (code[6] == "2" || code[6] == "3"){
	product_list.push("Iron");
} if (code[5] == "1"){
	product_list.push("Folic Acid");
} if (code[5] == "2" || code[5] == "3"){
	product_list.push("Prenatal");
} if (code[4] == "1" || code[4] == "3"){
	product_list.push("Turmeric");
} if (code[4] == "2" || code[4] == "3"){
	product_list.push("Vitamin C");
} if (code[3] == "1" || code[3] == "3"){
	product_list.push("Vitamin B Complex");
} if (code[3] == "2"){
	product_list.push("Vitamin B12");
}

let x = document.getElementsByClassName("collection-product");
for (let i = 0;i<x.length;i++){
	let y = x[i].getElementsByClassName("product-label-2");
	var product = y[0].firstChild.nodeValue;
	if (product_list.includes(product)) {
		stock_ct++;
		assessRecReason(product,x[i]);
		assessDeficiency(product,x[i]);
		continue
	} else {
		x[i].style.display = "none";
	}
}
document.getElementsByClassName('recommendation-list')[0].innerText=product_list.join(" | ");
document.getElementsByClassName('recommendation-list')[0].style.backgroundColor = "#eeeeee";

//Update First Name on Page
let fn = String(url.searchParams.get("fn"));
function titleCase(str) {
  return str.toLowerCase().split(' ').map(function(word) {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
}
fn = titleCase(fn);
document.getElementsByClassName('rec-name')[0].innerText=fn+",";



//Add listeners to format buttons
all_options = document.getElementsByClassName("option-buttons-1");

format_button = document.querySelectorAll('[format="bottles"]');//note: misnomer
pack_button = document.querySelectorAll('[format="daily-packs"]');

format_button[0].addEventListener('click',function(){
	for (var i = 0; i < all_options.length;i++){
		if (all_options[i].innerText.startsWith("Bottle")){
			all_options[i].click();
		}

	}
});
pack_button[0].addEventListener('click',function(){
	for (var i = 0; i < all_options.length;i++){
		if (all_options[i].innerText.startsWith("Daily Pack")){
			all_options[i].click();
		}

	}
});

//show membership options

if (stock_ct == 1 | stock_ct == 2){
	let options1 = document.getElementsByClassName("membership-options-1");
	let options2 = document.getElementsByClassName("membership-options-2");
	options1[0].style.display = 'none';
	options2[0].style.display = 'inline';

} if (stock_ct ==0){
	let rec_desc_1 = document.getElementById("rec-desc-1");
	let rec_desc_2 = document.getElementById("rec-desc-2");
	rec_desc_1.style.display = 'none';
	rec_desc_2.style.display = 'inline';
}









