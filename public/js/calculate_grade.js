function computeGrade(assignments, categories, decimals) {

	let categoryScores = {}, categoryMaxScores = {}, categoryGrades = {};

	
	for (let category in categories) {
		categoryScores[category] = 0;
		categoryMaxScores[category] = 0;
		categoryGrades[category] = 0;
	}




	let totalScore = 0, totalMaxScore = 0;

	if (Object.keys(categories).length === 0) {
		for (let j = 0; j < assignments.length; j++) {
			totalScore += parseFloat(assignments[j].score);
			totalMaxScore += parseFloat(assignments[j].max_score);
		}

		let totalPercent = totalScore / totalMaxScore;

		return "" + (Math.round(totalPercent * 10000) / 100);

	} else {
		for (let i = 0; i < assignments.length; i++) {
			if (assignments[i].score != "None") {
				totalScore += parseFloat(assignments[i].score);
				totalMaxScore += parseFloat(assignments[i].max_score);

				categoryScores[assignments[i].category] += parseFloat(assignments[i].score);
				categoryMaxScores[assignments[i].category] += parseFloat(assignments[i].max_score);
			}
		}



		let categoryPercent = 0, counterWeight = 1;

		for (category in categories) {
			if (categoryMaxScores[category] === 0) {
				counterWeight -= parseFloat(categories[category]);
				categoryGrades[category] = "N/A";
			} else {
				categoryGrades[category] = (0.0 + categoryScores[category]) / categoryMaxScores[category];
				categoryPercent += ((0.0 + categoryScores[category]) / categoryMaxScores[category]) * parseFloat(categories[category]);
			}
		}

		categoryPercent /= counterWeight;

		let totalPercent = totalScore / totalMaxScore;


		return {
			categoryPercent: "" + (Math.round(categoryPercent * Math.pow(10, decimals + 2)) / Math.pow(10, decimals)),
			totalPercent: "" + (Math.round(totalPercent * Math.pow(10, decimals + 2)) / Math.pow(10, decimals)),
			categoryScores,
			categoryMaxScores,
			categoryGrades,
		};
	}

}




function determineGradeType(assignments, categories, currentGrade) {
	let categoryScores = {}, categoryMaxScores = {}, categoryGrades = {};

	
	for (let category in categories) {
		categoryScores[category] = 0;
		categoryMaxScores[category] = 0;
		categoryGrades[category] = 0;
	}




	let totalScore = 0, totalMaxScore = 0;

	if (Object.keys(categories).length === 0) {
		for (let j = 0; j < assignments.length; j++) {
			totalScore += parseFloat(assignments[j].score);
			totalMaxScore += parseFloat(assignments[j].max_score);
		}

		let totalPercent = totalScore / totalMaxScore;

		return "" + (Math.round(totalPercent * 10000) / 100);

	} else {
		for (let i = 0; i < assignments.length; i++) {
			if (assignments[i].score != "None") {
				totalScore += parseFloat(assignments[i].score);
				totalMaxScore += parseFloat(assignments[i].max_score);

				categoryScores[assignments[i].category] += parseFloat(assignments[i].score);
				categoryMaxScores[assignments[i].category] += parseFloat(assignments[i].max_score);
			}
		}



		let categoryPercent = 0, counterWeight = 1;

		for (category in categories) {
			if (categoryMaxScores[category] === 0) {
				counterWeight -= parseFloat(categories[category]);
				categoryGrades[category] = "N/A";
			} else {
				categoryGrades[category] = (0.0 + categoryScores[category]) / categoryMaxScores[category];
				categoryPercent += ((0.0 + categoryScores[category]) / categoryMaxScores[category]) * parseFloat(categories[category]);
			}
		}

		categoryPercent /= counterWeight;

		let totalPercent = totalScore / totalMaxScore;

		categoryPercent = Math.round(categoryPercent * 1000) / 1000;
		totalPercent = Math.round(totalPercent * 1000) / 1000;

		let type;

		if (Math.abs(categoryPercent * 100 - parseFloat(currentGrade)) <= Math.abs(totalPercent * 100 - parseFloat(currentGrade))) {
			type = 'categoryPercent';
		} else {
			type = 'totalPercent';
		}

		return {
			type,
			categoryScores,
			categoryMaxScores,
			categoryGrades,

		};
	}
}

function getWeight(category, constCategories, constWeights) {
	for (let k = 0; k < constCategories.length; k++) {
		if (category === constCategories[k]) {
			return constWeights[k];
		}
	}
	return "Weight Not Found";
}


function getRGB(gradeToBeColored) {
	if (parseFloat(gradeToBeColored) >= 90) {
		return rgb[0];
	} else if (parseFloat(gradeToBeColored) >= 80) {
		return rgb[1];
	} else if (parseFloat(gradeToBeColored) >= 70) {
		return rgb[2];
	} else if (parseFloat(gradeToBeColored) >= 60) {
		return rgb[3];
	} else if (parseFloat(gradeToBeColored) >= 0) {
		return rgb[4];
	} else {
		return 'rgb(255,255,255)';
	}
}

function computeGPA() {
	let sum = 0;
	let counter = 0.0;
	for (let i = 0; i < tableData.classes.length; i++) {
		if (!isNaN(parseFloat(tableData.classes[i].calculated_grade))) {
			if (parseFloat(tableData.classes[i].calculated_grade) > 100) {
				sum += 100;
			} else {
				sum += parseFloat(tableData.classes[i].calculated_grade);
			}
			counter += 1.0;
		}
	}
	return Math.round(sum / counter * 100) / 100;
}

function doCalculations(assignments, categories) {

	let categoryScores = {}, categoryMaxScores = {}, categoryGrades = {};


	for (let category in categories) {
		categoryScores[category] = 0;
		categoryMaxScores[category] = 0;
		categoryGrades[category] = 0;
	}




	let totalScore = 0, totalMaxScore = 0;

	if (Object.keys(categories).length === 0) {
		for (let j = 0; j < assignments.length; j++) {
			totalScore += parseFloat(assignments[j].score);
			totalMaxScore += parseFloat(assignments[j].max_score);
		}

		let totalPercent = totalScore / totalMaxScore;

		return "" + (Math.round(totalPercent * 10000) / 100);

	} else {
		for (let i = 0; i < assignments.length; i++) {
			if (assignments[i].score != "None") {
				totalScore += parseFloat(assignments[i].score);
				totalMaxScore += parseFloat(assignments[i].max_score);

				categoryScores[assignments[i].category] += parseFloat(assignments[i].score);
				categoryMaxScores[assignments[i].category] += parseFloat(assignments[i].max_score);
			}
		}



		let categoryPercent = 0, counterWeight = 1;

		for (category in categories) {
			if (categoryMaxScores[category] === 0) {
				counterWeight -= parseFloat(categories[category]);
				categoryGrades[category] = "N/A";
			} else {
				categoryGrades[category] = (0.0 + categoryScores[category]) / categoryMaxScores[category];
				categoryPercent += ((0.0 + categoryScores[category]) / categoryMaxScores[category]) * parseFloat(categories[category]);
			}
		}

		categoryPercent /= counterWeight;

		let totalPercent = totalScore / totalMaxScore;

	}

	return {
		categoryScores,
		categoryMaxScores,
		categoryGrades,
		categoryPercent,
		totalPercent,
	};
}