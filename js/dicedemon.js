/***
	Dice Demon Javascript
***/

// Remove item from array by item's value
Array.prototype.remove = function (element_value) {
	var index = this.indexOf(element_value);
	this.splice(index, 1);
}

// Report error; halt program
function issue_error(error_msg) {
	alert(error_msg);
	throw new Error(error_msg);
	//return;
}

// Return decimal number to two places
function fixed_two(num) {
	return Number(num).toFixed(2);
}

// Get value of form element by ID
function get_value(element_id) {
	return document.getElementById(element_id).value;
}

// Add option to select id
function add_option(select_id, option_value) {
	var select_node = document.getElementById(select_id);
	var new_option = document.createElement("option");
	new_option.text = option_value;
	select_node.add(new_option);
}


// Insert option tags to a selection node
function add_dice_options(select_id) {
	var dice_arr = [2, 4, 6, 8, 10, 12, 20, 100];
	for(var i = 0; i < dice_arr.length; i++) {
		add_option(select_id, dice_arr[i]);
	}
}

// Add label tag to a parent node
function add_label(label_for, label_text, parent_id) {
	var parent_node = document.getElementById(parent_id);
	var new_label = document.createElement('label');
	var text_node = document.createTextNode(label_text);
	new_label.htmlFor = label_for;
	new_label.appendChild(text_node);
	parent_node.appendChild(new_label);
}

// Add a select tag to a parent node
function add_select(select_name, parent_id) {
	var parent_node = document.getElementById(parent_id);
	var new_select = document.createElement('select');
	new_select.name = select_name;
	new_select.id = select_name;
	parent_node.appendChild(new_select);
}

// Add an input tag to a parent node
function add_input(input_name, input_type, parent_id) {
	var parent_node = document.getElementById(parent_id);
	var new_input = document.createElement('input');
	new_input.name = input_name;
	new_input.id = input_name;
	new_input.type = input_type;
	parent_node.appendChild(new_input);
}

// Add text content to element node
function add_text(text_content, parent_id) {
	var parent_node = document.getElementById(parent_id);
	var text_node = document.createTextNode(text_content);
	parent_node.appendChild(text_node);
}

// Add a plain div with content
function add_div(parent_id) {
	var parent_node = document.getElementById(parent_id);
	var new_div = document.createElement('div');
	new_div.innerHTML = arguments[1];
	parent_node.appendChild(new_div);
}

// Add a plain div with content
function add_result() {
	add_div('result_div', arguments[0]);
}

// Clear html element contents
function clear_element(element_id) {
	document.getElementById(element_id).innerHTML = '';
}

// Add option nodes to a parent node using a range of numbers as values for each option
function add_number_options(select_id, min_number, max_number) {
	var select_node = document.getElementById(select_id);
	select_node.innerHTML = '';
	for(var i = min_number; i <= max_number; i++) {
		add_option(select_id, i);
	}
}

// Return the selected radio value for form type
function get_form_type(party_type) {
	var radio_btns = document.getElementsByName(party_type + '_characters');
	for(var i = 0; i < radio_btns.length; i++) {
		if(radio_btns[i].checked) {
			var radio_value = radio_btns[i].value;
			return radio_value;
		}
	}
}

// Add an add character button for individual character form
function add_char_btn(party_type) {
	var parent_node = document.getElementById(party_type + '_char_btns')
	var char_btn = document.createElement('button');
	var onclick_value = 'add_character(\'' + party_type + '\')';
	char_btn.setAttribute('onclick', onclick_value);
	char_btn.type = 'button';
	char_btn.id = party_type + '_add_btn';
	char_btn.className = 'add_btn';
	char_btn.textContent = '+';
	parent_node.innerHTML = '';
	parent_node.appendChild(char_btn);
}

// Add a delete character button to individual character form node
function del_char_btn(party_type) { // , node_number, element_node
	var parent_node = document.getElementById(party_type + '_char_btns'),
		delete_btn = document.createElement('button'),
		onclick_value = 'remove_character(\'' + party_type + '\')';
	delete_btn.setAttribute('onclick', onclick_value);
	delete_btn.type = 'button';
	delete_btn.id = party_type + '_del_btn';
	delete_btn.className = 'del_btn';
	delete_btn.textContent = 'x';
	parent_node.appendChild(delete_btn);
}

// Dynamically add range for difficulty/success selection node options
function add_difficulty(party_type, select_id) {
	var selected_die = get_value(party_type + '_dice_sides');
	add_number_options(select_id, min_diff, selected_die);
}

// Dynamically add range for difficulty/success selection node options
function update_difficulty() {
	if(this.id == 'pc_dice_sides') { party_type = 'pc'; }
	else if(this.id == 'npc_dice_sides') { party_type = 'npc'; }
	var form_type = get_form_type(party_type),
		selected_die_count = get_value(party_type + '_dice_sides');
	if(form_type == 'individual') {
		var form_div = document.getElementById(party_type + '_form'),
			node_count = form_div.childNodes.length;
		for(var i = 1; i <= node_count; i++) {
			var diff_id = party_type + '_difficulty_' + i,
				select_diff = document.getElementById(diff_id);
			select_diff.innerHTML = '';
			for(var j = 1; j <= selected_die_count; j++) {
				add_option(diff_id, j);
			}
		}
	}
	else if(form_type == 'identical') {
		var diff_id = party_type + '_difficulty';
		add_number_options(diff_id, min_diff, selected_die_count);
	}
}

// Add character form elements in PC or NPC form
function add_character(party_type) {
	var element_node = document.getElementById(party_type + '_form');
	var next_count = element_node.childNodes.length + 1;
	var char_div = document.createElement('div');
	var char_div_id = party_type + '_' + next_count;
	char_div.id = char_div_id;
	element_node.appendChild(char_div);
	add_text(party_type.toUpperCase() + ' #' + next_count + ': ', char_div_id);
	var select_id = party_type + '_dice_count_' + next_count;
	add_label(select_id, 'Dice Count', char_div_id);
	add_select(select_id, char_div_id);
	add_number_options(select_id, min_dice, max_dice);
	var select_diff_id = party_type + '_difficulty_' + next_count;
	add_label(select_diff_id, 'Difficulty', char_div_id);
	add_select(select_diff_id, char_div_id);
	var selected_die_count = get_value(party_type + '_dice_sides');
	add_number_options(select_diff_id, min_diff, selected_die_count);
	var select_hp_id = party_type + '_hitpoints_' + next_count;
	add_label(select_hp_id, 'Hit Points: ', char_div_id);
	add_input(select_hp_id, 'number', char_div_id);
	if(next_count == 2) {
		del_char_btn(party_type);
	}
}

// Remove character form elements in PC or NPC form
function remove_character(party_type) {
	var form_div = document.getElementById(party_type + '_form');
	var nodes_count = form_div.childNodes.length - 1;
	var node_to_remove = form_div.childNodes[nodes_count];
	node_to_remove.parentNode.removeChild(node_to_remove);
	if(nodes_count < 2) {
		var del_btn = document.getElementById(party_type + '_del_btn');
		del_btn.parentNode.removeChild(del_btn);
	}
}


// Create the form for selected form type and character type (PC/NPC)
function set_form(party_type) {
	var form_id = party_type + '_form';
	var form_div = document.getElementById(form_id);
	form_div.innerHTML = '';
	var form_type = get_form_type(party_type);
	if(form_type == 'individual') {
		add_char_btn(party_type);
		add_character(party_type, form_div);
	}
	else if(form_type == 'identical') {
		var char_btns = document.getElementById(party_type + '_char_btns');
		char_btns.innerHTML = '';
		add_label(party_type + '_qty', 'Qty: ', form_id);
		add_input(party_type + '_qty', 'number', form_id);
		var select_dice = party_type + '_dice_count';
		add_label(select_dice, 'Dice Count: ', form_id);
		add_select(select_dice, form_id);
		add_number_options(select_dice, min_dice, max_dice);
		var select_diff = party_type + '_difficulty';
		add_label(select_diff, 'Difficulty: ', form_id);
		add_select(select_diff, form_id);
		var selected_die = get_value(party_type + '_dice_sides');
		add_number_options(select_diff, min_diff, selected_die);
		add_label(party_type + '_hitpoints', 'Hit Points: ', form_id);
		add_input(party_type + '_hitpoints', 'number', form_id);
	}
}

// Set party radio button functions
function set_party_btns(party_type) {
	var radio_btns = document.getElementsByName(party_type + '_characters');
	for(var i = 0; i < radio_btns.length; i++) {
		radio_btns[i].onclick = function() {
			set_form(party_type);		
		};
	}
}

// Test if value is integer
function is_int(num_value) {
	if(parseFloat(num_value) == parseInt(num_value) && !isNaN(num_value)) {
		return true;
	}
	else {
		return false;
	}
}

// Test if value is positive integer above zero
function is_pos_int(num_value) {
	if(parseFloat(num_value) == parseInt(num_value) && !isNaN(num_value) && num_value > 0) {
		return true;
	}
	else {
		return false;
	}
}

// Return shuffled order for supplied array elements
function shuffle_arr(arr) {
	var current_index = arr.length, temp_value, rand_index ;
	// While there remain elements to shuffle...
	while (0 !== current_index) {
		// Pick a remaining element...
		rand_index = Math.floor(Math.random() * current_index);
		current_index -= 1;

		// And swap it with the current element.
		temp_value = arr[current_index];
		arr[current_index] = arr[rand_index];
		arr[rand_index] = temp_value;
	}
	return arr;
}

// Generate a random number between 1 and max_num
function random_num(max_num) {
	return Math.floor((Math.random() * max_num) + 1);
}

// Roll for a character's successes
function roll_for_successes(die_type, dice_count, difficulty) {
	var successes = 0;
	for(var i = 0; i < dice_count; i++) {
		roll = random_num(die_type);
		if(roll >= difficulty) {
			successes++;
		}
	}
	return successes;
}

// Generate character object info
function generate_char(dice_count, difficulty, hitpoints) {
	var char_info = {dice_count: dice_count, difficulty: difficulty, hitpoints: hitpoints, curr_hitpoints: hitpoints};
	return char_info;
}

// Generate party object from form when set to identical
function generate_identical_party(party_type) {
	var qty = get_value(party_type + '_qty');
	if(!is_pos_int(qty)) {
		issue_error(party_type.toUpperCase() + ' quantity must be a positive integer greater than zero');
		return;
	}
	var hitpoints = get_value(party_type + '_hitpoints');
	if(!is_pos_int(hitpoints)) {
		issue_error(party_type.toUpperCase() + ' hitpoints must be a positive integer greater than zero');
		return;
	}
	var dice_count = get_value(party_type + '_dice_count');
	var difficulty = get_value(party_type + '_difficulty');
	var party = [];
	for(var i = 1; i <= qty; i++) {
		var char_info = generate_char(dice_count, difficulty, hitpoints);
		party[party_type + '_' + i] = char_info;
	}
	return party;
}

// Generate party object from form when set to individual
function generate_individual_party(party_type) {
	var element_node = document.getElementById(party_type + '_form');
	var count = element_node.childNodes.length; alert(count);/////////////
	var party = [];
	for(var i = 1; i <= count; i++) {
		var dice_count = get_value(party_type + '_dice_count_' + i);
		var difficulty = get_value(party_type + '_difficulty_' + i);
		var hitpoints = get_value(party_type + '_hitpoints_' + i);
		var char_info = generate_char(dice_count, difficulty, hitpoints);
		party[party_type + '_' + i] = char_info;
	}
	return party;
}

// Reset curr_hitpoints for party object
function reset_curr_hitpoints(party) {
	for(character in party) {
		party[character]['curr_hitpoints'] = party[character]['hitpoints'];
	}
}

// Process form and display results
function process_form() {
	var run_count = get_value('run_count');
	if(!is_pos_int(run_count)) {
		issue_error('Run count must be a positive integer greater than zero');
		return;
	}
	var statistics = {
		run_count: run_count,
		total_rounds: 0,
		max_rounds: 0,
		min_rounds: null,
		avg_rounds: null,
		pc_wins: 0,
		npc_wins: 0,
		pc_alive: 0,
		npc_alive: 0,
		pc_avg_alive: 0,
		npc_avg_alive: 0
	}
	
	var pc_die = get_value('pc_dice_sides');
	var npc_die = get_value('npc_dice_sides');
	var pc_form_type = get_form_type('pc');
	var npc_form_type = get_form_type('npc');
	
	if(pc_form_type == 'identical') {
		var pc_party = generate_identical_party('pc');
	}
	else {
		var pc_party = generate_individual_party('pc');
	}
	if(npc_form_type == 'identical') { 
		var npc_party = generate_identical_party('npc');
	}
	else {
		var npc_party = generate_individual_party('npc');
	}

	for(var run = 1; run <= run_count; run++) {
		reset_curr_hitpoints(pc_party);
		reset_curr_hitpoints(npc_party);
		
		var pc_party_living = Object.keys(pc_party);
		var npc_party_living = Object.keys(npc_party);
		var rounds = 0;
		

		while(pc_party_living.length > 0) {
			if(npc_party_living.length > 0) {
				rounds++;
				statistics.total_rounds++;
				var pc_rand_def = shuffle_arr(pc_party_living);
				var npc_rand_def = shuffle_arr(npc_party_living);
				var pc_current_index_def = 0;
				var npc_current_index_def = 0;

				/*** Need to add options for combat order: PCs first, NPCs first, random order per round, random order per run, and set random order ***/

				for(var i = 0; i < pc_party_living.length; i++) {
					var pc = pc_party_living[i];
					var pc_dice_count = pc_party[pc]['dice_count'];
					var pc_difficulty = pc_party[pc]['difficulty'];
					var pc_successes = roll_for_successes(pc_die, pc_dice_count, pc_difficulty);
					// Check if any npcs are living
					if(npc_party_living.length == 0) {
						break;
					}
					// Re-shuffle and reset index to first npc if attacks have run through all npcs
					else if(npc_current_index_def == npc_party_living.length) {
						npc_rand_def = shuffle_arr(npc_party_living);
						npc_current_index_def = 0;
					}
					var npc = npc_rand_def[npc_current_index_def];
					var npc_dice_count = npc_party[npc]['dice_count'];
					var npc_difficulty = npc_party[npc]['difficulty'];
					var npc_hitpoints = npc_party[npc]['curr_hitpoints'];
					var npc_successes = roll_for_successes(npc_die, npc_dice_count, npc_difficulty);
					if(pc_successes > npc_successes) {
						var hits = pc_successes - npc_successes;
						var new_hitpoints = npc_hitpoints - hits;
						if(new_hitpoints <= 0) {
							npc_party[npc]['curr_hitpoints'] = 0;
							npc_party_living.remove(npc);
						}
						else {
							npc_party[npc]['curr_hitpoints'] = new_hitpoints;
						}
					}
				}
				for(var i = 0; i < npc_party_living.length; i++) {
					var npc = npc_party_living[i],
						npc_dice_count = npc_party[npc]['dice_count'],
						npc_difficulty = npc_party[npc]['difficulty'],
						npc_successes = roll_for_successes(npc_die, npc_dice_count, npc_difficulty);
					// Check if any PCs are living
					if(pc_party_living.length == 0) {
						break;
					}
					// Re-shuffle and reset index to first PC if attacks have run through all npcs
					else if(pc_current_index_def == pc_party_living.length) {
						pc_rand_def = shuffle_arr(pc_party_living);
						pc_current_index_def = 0;
					}
					var pc = pc_rand_def[pc_current_index_def],
						pc_dice_count = pc_party[pc]['dice_count'],
						pc_difficulty = pc_party[pc]['difficulty'],
						pc_hitpoints = pc_party[pc]['curr_hitpoints'];
						pc_successes = roll_for_successes(pc_die, pc_dice_count, pc_difficulty);
					if(npc_successes > pc_successes) {
						var hits = npc_successes - pc_successes,
							new_hitpoints = pc_hitpoints - hits;
						if(new_hitpoints <= 0) {
							pc_party[pc]['curr_hitpoints'] = 0;
							pc_party_living.remove(pc);
						}
						else {
							pc_party[pc]['curr_hitpoints'] = new_hitpoints;
						}
					}
				}

			}
			else {
				statistics.pc_wins++; /*** PC win counter ***/
				statistics.pc_alive += pc_party_living.length;
				break;
			}
		}
		if(statistics.min_rounds) {
			if(rounds < statistics.min_rounds) {
				statistics.min_rounds = rounds;
			}

			// Insert who won min round

		}
		else {
			statistics.min_rounds = rounds;
		}
		if(rounds > statistics.max_rounds) {
			statistics.max_rounds = rounds;

			// Insert who won max round

		}
		/*** NPC Win counter ***/
		if(pc_party_living.length == 0) {
			statistics.npc_wins++;
			statistics.npc_alive += npc_party_living.length;
		}

	}
	statistics.avg_rounds = fixed_two(statistics.total_rounds / statistics.run_count);
	if(statistics.pc_wins > 0) {
		statistics.pc_avg_alive = fixed_two(statistics.pc_alive / statistics.pc_wins);
	}
	if(statistics.npc_wins > 0) {
		statistics.npc_avg_alive = fixed_two(statistics.npc_alive / statistics.npc_wins);
	}
	
	clear_element('result_div');
	add_result('Runs: ' + statistics.run_count);
	add_result('PC Party Wins: ' + statistics.pc_wins);
	add_result('Avg PCs Alive Per Win: ' + statistics.pc_avg_alive);
	add_result('NPC Party Wins: ' + statistics.npc_wins);
	add_result('Avg NPCs Alive Per Win: ' + statistics.npc_avg_alive);
	add_result('Minimum Rounds: ' + statistics.min_rounds);
	add_result('Maximum Rounds: ' + statistics.max_rounds);
	add_result('Total Rounds: ' + statistics.total_rounds);
	add_result('Avg Rounds Per Run: ' + statistics.avg_rounds);

	console.log('Runs: ' + statistics.run_count);
	console.log('PC Party Wins: ' + statistics.pc_wins);
	console.log('Avg PCs Alive Per Win: ' + statistics.pc_avg_alive);
	console.log('NPC Party Wins: ' + statistics.npc_wins);
	console.log('Avg NPCs Alive Per Win: ' + statistics.npc_avg_alive);
	console.log('Minimum Rounds: ' + statistics.min_rounds);
	console.log('Maximum Rounds: ' + statistics.max_rounds);
	console.log('Total Rounds: ' + statistics.total_rounds);
	console.log('Avg Rounds Per Run: ' + statistics.avg_rounds);
}


// Initialize variables used in initial page/form generation
var min_dice = 1, max_dice = 10, min_diff = 1,
	dice_form = document.getElementById('dice_form'),
	pc_dice_select = document.getElementById('pc_dice_sides'),
	npc_dice_select = document.getElementById('npc_dice_sides');


// Add onclick functions to radio buttons for setting form type
set_party_btns('pc');
set_party_btns('npc');


// Set static form options
add_dice_options('pc_dice_sides');
add_dice_options('npc_dice_sides');

pc_dice_select.onchange = update_difficulty;
npc_dice_select.onchange = update_difficulty;


// Initialize forms
set_form('pc');
set_form('npc');


// Form submit
dice_form.onsubmit = function(e) {
	e.preventDefault();
	process_form();
}