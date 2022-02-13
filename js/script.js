

document.querySelectorAll('.months__month').forEach((n, i, a) => {
	n.addEventListener('click', () => a.forEach(m => m.classList.toggle('active', m === n)));
});
document.querySelectorAll('.column__number').forEach((n, i, a) => {
	n.addEventListener('click', () => { a.forEach(m => m.classList.toggle('active', m === n)); addDate(); });
});

document.addEventListener("click", month);

let dateArray = [];  //Верхний слой вложенности(Основа при выборе даты)
let chapterArray = []; //Верхний слой вложенности(Основа при выборе темы)
let todoArray = []; //Верхний слой вложенности(Основа при выборе задачи)
let chapterAddList = document.querySelector('.chapter__list')
let chapterAddButton = document.querySelector('.chapter__button');
let chapterAddMassage = document.querySelector('.chapter__text');
let chapterDeleteButton = document.querySelector('.chapter__delete');
let todoAddList = document.querySelector('.tasks__list')
let todoAddButton = document.querySelector('.tasks__button');
let todoAddMassage = document.querySelector('.tasks__text');
let todoDeleteButton = document.querySelector('.tasks__delete');


function month(event) {
	if (event.target.closest('.month.active')) {
		let textIn = document.querySelector('.month.active').children;
		for (let element of textIn) {
			let text = element.innerHTML
			let deleteClassChildren = document.querySelector('.calendar__numbers').children;
			for (let element of deleteClassChildren) {
				element.classList.remove('active');
			}
			let last = document.querySelector('.' + text);
			last.classList.toggle('active');
		}
		displayMassagesChapter()
		displayMassagesTodo()
	}
}



function monthCurray() {
	let d = new Date();
	let monthCurray = d.getMonth();
	let dateCurray = d.getDate();
	let addMonthUse = document.querySelector('.calendar__months').children[monthCurray];
	let addMonthDateUse = document.querySelector('.calendar__numbers').children[monthCurray];
	addMonthUse.classList.add('active');
	addMonthDateUse.classList.add('active');
	let numberActive = document.querySelector('.numbers__columns.active').querySelectorAll('.column__number');
	for (let element of numberActive) {
		if ((element.innerHTML) == dateCurray) {
			element.classList.add('active');
		}
	}
	addDate()

}
monthCurray();
if (localStorage.getItem('todoArray')) {
	todoArray = JSON.parse(localStorage.getItem('todoArray'));
	displayMassagesTodo();
}
if (localStorage.getItem('chapterArray')) {
	chapterArray = JSON.parse(localStorage.getItem('chapterArray'));
	displayMassagesChapter();
}
if (localStorage.getItem('dateArray')) {
	dateArray = JSON.parse(localStorage.getItem('dateArray'));
	displayMassagesChapter();
	displayMassagesTodo();
}
function addDate() {
	chapterAddList.innerHTML = '';
	todoAddList.innerHTML = '';
	let interruption
	let tempMonth = document.querySelector('.months__month.active').children[0].innerText
	let tempNumber = document.querySelector('.column__number.active').innerHTML
	dateArray.forEach(function (item, i) {
		if (!item.chapterArray.lenght === 0) {
			dateArray.splice(i, 1)
		}
		else if (item.chapterArray.lenght !== 0) {
			/*
			displayMassagesChapter()
			item.chapterArray.forEach(function (item) {

				if (item.content.checked) {
					item.todo.forEach(function (item) {
						displayMassagesTodo()
					})
				}
				else if (!item.content.checked) {
					dateArray.forEach(function (item, i) {
						item.todo.forEach(function () {
							displayMassagesTodo()
						})
					})
				}
			})*/
		}
		if ((item.value.month == tempMonth) && (item.value.day == tempNumber)) {
			interruption = true;
		}
	});
	if (interruption) {
		return
	}
	let tempObjWrapper = {}
	let tempObj = {}
	if (dateArray)
		tempObj.month = tempMonth;
	tempObj.day = tempNumber;
	tempObj.year = '2022'
	tempObjWrapper.value = tempObj
	dateArray.push(tempObjWrapper)
	dateArray.forEach(function (item) {
		if ((item.value.month === tempMonth) && (item.value.day === tempNumber)) {
			if (!item.chapterArray) {
				item.chapterArray = []
			}
			if (!item.todo) {
				item.todo = []
			}
		}
	})
	displayMassagesChapter()
	displayMassagesTodo()
}
/*
let exit = false;
let iconMenu = document.querySelector('.icon-menu')
if (iconMenu.classList.contains('active')) {
	if (chapterArray.length === 0){}
		if (item.content.checked) {}											структура зависимостей
		else if(!item.content.checked){}
}
else if (!iconMenu.classList.contains('active')){
	let monthActive = document.querySelector('.months__month.active').children[0].innerText
		let numberActive = document.querySelector('.column__number.active').innerHTML
		if ((item.value.month === monthActive) && (item.value.day === numberActive)) {
			if (item.chapterArray.length === 0) {
				if (item.content.checked) {}
				else if (!item.content.checked) {}
		}
}
*/
chapterAddButton.addEventListener('click', function () {
	if (!chapterAddMassage.value) return;
	let iconMenu = document.querySelector('.todo__view')
	if (iconMenu.classList.contains('active')) { // Заголовок без привязки к дате
		let newChapter = {
			title: chapterAddMassage.value,
			content: {
				value: chapterAddMassage.value,
				checked: false,
			},
			todo: [],
		}
		chapterArray.push(newChapter);
		//console.log(dateArray)
		displayMassagesChapter()
		localStorage.setItem('chapterArray', JSON.stringify(chapterArray));
		chapterAddMassage.value = '';
	}
	else if (!iconMenu.classList.contains('active')) { // Заголовок с привязкой к дате
		let monthActive = document.querySelector('.months__month.active').children[0].innerText
		let numberActive = document.querySelector('.column__number.active').innerHTML
		dateArray.forEach(function (item) {
			if ((item.value.month === monthActive) && (item.value.day === numberActive)) {

				let newChapter = {
					title: chapterAddMassage.value,
					content: {
						value: chapterAddMassage.value,
						checked: false,
					},
					todo: [],
				}
				item.chapterArray.push(newChapter);
				//console.log(dateArray)
				displayMassagesChapter()
				localStorage.setItem('dateArray', JSON.stringify(dateArray));
				chapterAddMassage.value = '';
			}

		})

	}
	chapterAddMassage.value = '';
})
todoAddButton.addEventListener('click', function () {
	let exit = false;
	if (!todoAddMassage.value) return;
	let iconMenu = document.querySelector('.todo__view')
	if (iconMenu.classList.contains('active')) { // Заголовок без привязки к дате
		if (chapterArray.length === 0) {
			exit = true;
		}
		chapterArray.forEach(function (item) {
			if (item.content.checked) {
				let newTodo = {
					title: todoAddMassage.value,
					content: {
						value: todoAddMassage.value,
						checked: false,
						important: false,
					},
				}
				item.todo.push(newTodo);
				//console.log(dateArray);
				displayMassagesTodo();
				localStorage.setItem('chapterArray', JSON.stringify(chapterArray));
				todoAddMassage.value = '';
			}
			else if (!item.content.checked) {
				exit = true;
			}
		})
		if (!todoAddMassage.value) return;
		if (exit) {
			let newTodo = {
				title: todoAddMassage.value,
				content: {
					value: todoAddMassage.value,
					checked: false,
					important: false,
				},
			}
			todoArray.push(newTodo);
			//console.log(todoArray);
			displayMassagesTodo();
			localStorage.setItem('todoArray', JSON.stringify(todoArray));
			todoAddMassage.value = '';
		}
	}
	else if (!iconMenu.classList.contains('active')) { // Заголовок с привязкой к дате
		let monthActive = document.querySelector('.months__month.active').children[0].innerText
		let numberActive = document.querySelector('.column__number.active').innerHTML
		dateArray.forEach(function (item) {
			if ((item.value.month === monthActive) && (item.value.day === numberActive)) {
				if (item.chapterArray.length === 0) {
					exit = true;
				}
				item.chapterArray.forEach(function (item) {
					if (item.content.checked) {
						let newTodo = {
							title: todoAddMassage.value,
							content: {
								value: todoAddMassage.value,
								checked: false,
								important: false,
							},
						}
						item.todo.push(newTodo);
						//console.log(dateArray);
						displayMassagesTodo();
						localStorage.setItem('dateArray', JSON.stringify(dateArray));
						todoAddMassage.value = '';

					}
					else if (!item.content.checked) {
						exit = true;
						//console.log(dateArray);
					}
				})
				if (!todoAddMassage.value) return;
				if (exit) {
					let newTodo = {
						title: todoAddMassage.value,
						content: {
							value: todoAddMassage.value,
							checked: false,
							important: false,
						},
					}
					item.todo.push(newTodo);
					//console.log(dateArray);
					displayMassagesTodo();
					localStorage.setItem('dateArray', JSON.stringify(dateArray));
					todoAddMassage.value = '';
				}
			}

		})

	}
	todoAddMassage.value = '';
})
function displayMassagesChapter() {
	let iconMenu = document.querySelector('.todo__view')
	let monthActive = document.querySelector('.months__month.active').children[0].innerText
	let numberActive = document.querySelector('.column__number.active').innerHTML
	displayMassage = '';
	if (iconMenu.classList.contains('active')) {
		if (chapterArray.length === 0) {
			chapterAddList.innerHTML = '';
		}
		chapterArray.forEach(function (item, i) {
			displayMassage += `
						<li>
								<input type='radio' id='item_${i}' ${item.content.checked ? 'checked' : ''}>
								<label for='item_${i}'}">${item.content.value}</label>
						</li>
						`

			chapterAddList.innerHTML = displayMassage
		})


	}
	else if (!iconMenu.classList.contains('active')) {
		dateArray.forEach(function (item, i) {
			if ((item.value.month === monthActive) && (item.value.day === numberActive)) {
				if (item.chapterArray.length === 0) {
					chapterAddList.innerHTML = '';
				}
				item.chapterArray.forEach(function (item, i) {
					displayMassage += `
						<li>
								<input type='radio' id='item_${i}' ${item.content.checked ? 'checked' : ''}>
								<label for='item_${i}'}">${item.content.value}</label>
						</li>
						`

					chapterAddList.innerHTML = displayMassage
				})
			}
		})

	}

	return displayMassage;
}
function displayMassagesTodo() {
	let iconMenu = document.querySelector('.todo__view')
	let monthActive = document.querySelector('.months__month.active').children[0].innerText
	let numberActive = document.querySelector('.column__number.active').innerHTML
	displayMassage = '';
	if (iconMenu.classList.contains('active')) {
		if ((chapterArray.filter(item => item.content.checked).length) !== 0) {
			chapterArray.forEach(function (item) {
				if (item.content.checked) {
					if (item.todo.length === 0) {
						todoAddList.innerHTML = '';
					}
					//console.log("test")
					item.todo.forEach(function (item, i) {
						displayMassage += `
							<li>
									<input type='checkbox' id='item_${i}' ${item.content.checked ? 'checked' : ''}>
									<label for='item_${i}'}" class="${item.content.important ? 'important' : ''}">${item.content.value}</label>
							</li>
							`

						todoAddList.innerHTML = displayMassage
					})
				}
			})
		}
		else if ((chapterArray.filter(item => item.content.checked).length) === 0) {
			if (todoArray.length === 0) {
				todoAddList.innerHTML = '';
			}
			//console.log("test")
			todoArray.forEach(function (item, i) {
				displayMassage += `
						<li>
								<input type='checkbox' id='item_${i}' ${item.content.checked ? 'checked' : ''}>
								<label for='item_${i}'}" class="${item.content.important ? 'important' : ''}">${item.content.value}</label>
						</li>
						`

				todoAddList.innerHTML = displayMassage
			});
		}
	}
	else if (!iconMenu.classList.contains('active')) {
		dateArray.forEach(function (item) {
			if ((item.value.month === monthActive) && (item.value.day === numberActive)) {
				if ((item.chapterArray.filter(item => item.content.checked).length) !== 0) {
					item.chapterArray.forEach(function (item) {
						if (item.content.checked) {
							if (item.todo.length === 0) {
								todoAddList.innerHTML = '';
							}
							item.todo.forEach(function (item, i) {
								//console.log(item)
								displayMassage += `
								<li>
										<input type='checkbox' id='item_${i}' ${item.content.checked ? 'checked' : ''}>
										<label for='item_${i}' class="${item.content.important ? 'important' : ''}">${item.content.value}</label>
								</li>
								`

								todoAddList.innerHTML = displayMassage
							})
						}
					})
				}
				else if ((item.chapterArray.filter(item => item.content.checked).length) === 0) {
					if (item.todo.length === 0) {
						todoAddList.innerHTML = '';
					}
					item.todo.forEach(function (item, i) {
						displayMassage += `
								<li>
										<input type='checkbox' id='item_${i}' ${item.content.checked ? 'checked' : ''}>
										<label for='item_${i}' class="${item.content.important ? 'important' : ''}">${item.content.value}</label>
								</li>
								`

						todoAddList.innerHTML = displayMassage
					})

				}
			}

		})
	}

	return displayMassage;
}
chapterAddList.addEventListener('click', function (event) {
	//displayMassagesTodo();

	let iconMenu = document.querySelector('.todo__view')
	if (iconMenu.classList.contains('active')) {
		chapterArray.forEach(function (item, i) {

			item.content.checked = false;
			displayMassagesChapter();
			displayMassagesTodo();
			localStorage.setItem('chapterArray', JSON.stringify(chapterArray));
			//console.log(chapterList)
			if (event.target.getAttribute('for').replace(/\D/g, '') == i) {
				if (event.target.previousSibling.previousSibling.hasAttribute('checked')) {
					item.content.checked = false;
					displayMassagesChapter();
					displayMassagesTodo();
					return;
				}
				//console.log(ChapterArray);
				item.content.checked = !item.content.checked;
				//console.log(chapterArray);
				displayMassagesChapter();
				displayMassagesTodo();
				localStorage.setItem('chapterArray', JSON.stringify(chapterArray));

			}

		})
	}
	else if (!iconMenu.classList.contains('active')) {
		let monthActive = document.querySelector('.months__month.active').children[0].innerText;
		let numberActive = document.querySelector('.column__number.active').innerHTML;

		dateArray.forEach(function (item) {
			if ((item.value.month === monthActive) && (item.value.day === numberActive)) {
				item.chapterArray.forEach(function (item, i) {
					item.content.checked = false;
					displayMassagesChapter();
					displayMassagesTodo();
					localStorage.setItem('dateArray', JSON.stringify(dateArray));
					//console.log(chapterList)
					if (event.target.getAttribute('for').replace(/\D/g, '') == i) {
						if (event.target.previousSibling.previousSibling.hasAttribute('checked')) {
							item.content.checked = false;
							displayMassagesChapter();
							displayMassagesTodo();
							return;
						}
						//console.log(ChapterArray);
						item.content.checked = !item.content.checked;
						//console.log(dateArray);
						displayMassagesChapter();
						displayMassagesTodo();
						localStorage.setItem('dateArray', JSON.stringify(dateArray));
						//localStorage.setItem('addListChapter', JSON.stringify(chapterList));
					}
				})

			}
		})

	}
})
todoAddList.addEventListener('change', function (event) {
	let iconMenu = document.querySelector('.todo__view');
	if (iconMenu.classList.contains('active')) {
		if (chapterArray.length === 0) {
			todoArray.forEach(function (item, i) {
				if (event.target.getAttribute('id').replace(/\D/g, '') == i) {
					//console.log(todoArray)
					item.content.checked = !item.content.checked;
					displayMassagesTodo();
					localStorage.setItem('todoArray', JSON.stringify(todoArray));
					//localStorage.setItem('addList', JSON.stringify(todoList));
				};
			});
		};
		chapterArray.forEach(function (item, i) {
			if (item.content.checked) {
				item.todo.forEach(function (item, i) {

					if (event.target.getAttribute('id').replace(/\D/g, '') == i) {
						//console.log(chapterArray);
						item.content.checked = !item.content.checked;
						displayMassagesTodo();
						localStorage.setItem('chapterArray', JSON.stringify(chapterArray));
						//localStorage.setItem('addList', JSON.stringify(todoList));
					};

				});
			}
			else if (!item.content.checked) {
				todoArray.forEach(function (item, i) {
					if (event.target.getAttribute('id').replace(/\D/g, '') == i) {
						//console.log(todoArray);
						item.content.checked = !item.content.checked;
						displayMassagesTodo();
						localStorage.setItem('todoArray', JSON.stringify(todoArray));
						//localStorage.setItem('addList', JSON.stringify(todoList));
					};
				});
			};
		})
	}
	else if (!iconMenu.classList.contains('active')) {
		let monthActive = document.querySelector('.months__month.active').children[0].innerText;
		let numberActive = document.querySelector('.column__number.active').innerHTML;
		dateArray.forEach(function (item, i) {
			if ((item.value.month === monthActive) && (item.value.day === numberActive)) {
				if (item.chapterArray.length === 0) {
					item.todo.forEach(function (item, i) {
						if (event.target.getAttribute('id').replace(/\D/g, '') == i) {
							item.content.checked = !item.content.checked;
							//console.log(dateArray)
							displayMassagesTodo();
							localStorage.setItem('dateArray', JSON.stringify(dateArray));
							//localStorage.setItem('addList', JSON.stringify(todoList));
						};
					})
				};
				item.chapterArray.forEach(function (item, i) {
					if (item.content.checked) {
						item.todo.forEach(function (item, i) {
							if (event.target.getAttribute('id').replace(/\D/g, '') == i) {
								item.content.checked = !item.content.checked;
								//console.log(dateArray)
								displayMassagesTodo();
								localStorage.setItem('dateArray', JSON.stringify(dateArray));
								//localStorage.setItem('addList', JSON.stringify(todoList));
							};
						})
					}
					else if (!item.content.checked) {
						dateArray.forEach(function (item, i) {
							item.todo.forEach(function (item, i) {
								if (event.target.getAttribute('id').replace(/\D/g, '') == i) {
									item.content.checked = !item.content.checked;
									//console.log(dateArray)
									displayMassagesTodo();
									localStorage.setItem('dateArray', JSON.stringify(dateArray));
									//localStorage.setItem('addList', JSON.stringify(todoList));
								};
							})
						})
					};
				})
			};
		})
	};
});
todoAddList.addEventListener('contextmenu', function (event) {
	event.target.classList.toggle('important')
	event.preventDefault();
	let iconMenu = document.querySelector('.todo__view');
	if (iconMenu.classList.contains('active')) {
		if (chapterArray.length === 0) {
			todoArray.forEach(function (item, i) {
				if (event.target.getAttribute('for').replace(/\D/g, '') == i) {
					item.content.important = !item.content.important
					displayMassagesTodo();
					localStorage.setItem('todoArray', JSON.stringify(todoArray));
					//localStorage.setItem('addList', JSON.stringify(todoList));
				}
			});
		};
		chapterArray.forEach(function (item, i) {
			if (item.content.checked) {
				item.todo.forEach(function (item, i) {

					if (event.target.getAttribute('for').replace(/\D/g, '') == i) {
						item.content.important = !item.content.important
						displayMassagesTodo();
						localStorage.setItem('chapterArray', JSON.stringify(chapterArray));
						//localStorage.setItem('addList', JSON.stringify(todoList));
					}

				});
			}
			else if (!item.content.checked) {
				todoArray.forEach(function (item, i) {
					if (event.target.getAttribute('for').replace(/\D/g, '') == i) {
						item.content.important = !item.content.important
						displayMassagesTodo();
						localStorage.setItem('todoArray', JSON.stringify(todoArray));
						//localStorage.setItem('addList', JSON.stringify(todoList));
					}
				});
			};
		})
	}
	else if (!iconMenu.classList.contains('active')) {
		let monthActive = document.querySelector('.months__month.active').children[0].innerText;
		let numberActive = document.querySelector('.column__number.active').innerHTML;
		dateArray.forEach(function (item, i) {
			if ((item.value.month === monthActive) && (item.value.day === numberActive)) {
				if (item.chapterArray.length === 0) {
					item.todo.forEach(function (item, i) {
						if (event.target.getAttribute('for').replace(/\D/g, '') == i) {
							item.content.important = !item.content.important
							displayMassagesTodo();
							localStorage.setItem('dateArray', JSON.stringify(dateArray));
							//localStorage.setItem('addList', JSON.stringify(todoList));
						}
					})
				};
				item.chapterArray.forEach(function (item, i) {
					if (item.content.checked) {
						item.todo.forEach(function (item, i) {
							if (event.target.getAttribute('for').replace(/\D/g, '') == i) {
								item.content.important = !item.content.important
								displayMassagesTodo();
								localStorage.setItem('dateArray', JSON.stringify(dateArray));
								//localStorage.setItem('addList', JSON.stringify(todoList));
							}
						})
					}
					else if (!item.content.checked) {
						dateArray.forEach(function (item, i) {
							item.todo.forEach(function (item, i) {
								if (event.target.getAttribute('for').replace(/\D/g, '') == i) {
									item.content.important = !item.content.important
									displayMassagesTodo();
									localStorage.setItem('dateArray', JSON.stringify(dateArray));
									//localStorage.setItem('addList', JSON.stringify(todoList));
								}
							})
						})
					};
				})
			};
		})
	};
});

chapterDeleteButton.addEventListener('click', function () {
	let iconMenu = document.querySelector('.todo__view')
	if (iconMenu.classList.contains('active')) {
		let tempListChapter = [];
		chapterArray.forEach(function (item, i) {

			if (!item.content.checked) {
				tempListChapter.push(item);
			}
		})
		chapterArray = [];
		chapterArray = JSON.parse(JSON.stringify(tempListChapter));
		displayMassagesChapter();
		displayMassagesTodo();
		localStorage.setItem('chapterArray', JSON.stringify(chapterArray));
		//localStorage.setItem('addListChapter', JSON.stringify(chapterList));
	}
	else if (!iconMenu.classList.contains('active')) {
		let monthActive = document.querySelector('.months__month.active').children[0].innerText
		let numberActive = document.querySelector('.column__number.active').innerHTML;
		dateArray.forEach(function (item, i) {
			if ((item.value.month === monthActive) && (item.value.day === numberActive)) {
				let tempListChapter = [];
				item.chapterArray.forEach(function (item, i) {
					if (!item.content.checked) {
						tempListChapter.push(item);
					}
				});
				item.chapterArray = [];
				item.chapterArray = JSON.parse(JSON.stringify(tempListChapter));
				displayMassagesChapter();
				displayMassagesTodo();
				localStorage.setItem('dateArray', JSON.stringify(dateArray));
				//localStorage.setItem('addListChapter', JSON.stringify(chapterList));
			}
		})
	}
});
todoDeleteButton.addEventListener('click', function () {
	let iconMenu = document.querySelector('.todo__view')
	if (iconMenu.classList.contains('active')) {
		if (chapterArray.length === 0) {
			let tempListTodo = [];
			todoArray.forEach(function (item) {
				if (!item.content.checked) {
					tempListTodo.push(item);
				}
			})
			todoArray = [];
			todoArray = JSON.parse(JSON.stringify(tempListTodo));
			displayMassagesTodo();
			localStorage.setItem('todoArray', JSON.stringify(todoArray));
			//localStorage.setItem('addListChapter', JSON.stringify(chapterList));
		}
		chapterArray.forEach(function (item) {
			if (item.content.checked) {
				let tempListTodo = [];

				item.todo.forEach(function (item) {
					if (!item.content.checked) {
						tempListTodo.push(item);
					}
				})
				item.todo = [];
				item.todo = JSON.parse(JSON.stringify(tempListTodo));
				displayMassagesTodo();
				localStorage.setItem('chapterArray', JSON.stringify(chapterArray));
				//localStorage.setItem('addListChapter', JSON.stringify(chapterList));

			}
			else if (!item.content.checked) {
				let tempListTodo = [];
				todoArray.forEach(function (item) {
					if (!item.content.checked) {
						tempListTodo.push(item);
					}
				})
				todoArray = [];
				todoArray = JSON.parse(JSON.stringify(tempListTodo));
				displayMassagesTodo();
				localStorage.setItem('todoArray', JSON.stringify(todoArray));
				//localStorage.setItem('addListChapter', JSON.stringify(chapterList));

			};
		})

	}
	else if (!iconMenu.classList.contains('active')) {
		let monthActive = document.querySelector('.months__month.active').children[0].innerText
		let numberActive = document.querySelector('.column__number.active').innerHTML;
		dateArray.forEach(function (item, i) {
			if ((item.value.month === monthActive) && (item.value.day === numberActive)) {
				if (item.chapterArray.length === 0) {
					let tempListTodo = [];
					item.todo.forEach(function (item) {
						if (!item.content.checked) {
							tempListTodo.push(item);
						}
					})
					item.todo = [];
					item.todo = JSON.parse(JSON.stringify(tempListTodo));
					displayMassagesTodo();
					localStorage.setItem('dateArray', JSON.stringify(dateArray));
					//localStorage.setItem('addListChapter', JSON.stringify(chapterList));
				};
				item.chapterArray.forEach(function (item) {
					if (item.content.checked) {
						let tempListTodo = [];
						item.todo.forEach(function (item) {
							if (!item.content.checked) {
								tempListTodo.push(item);
							}
						})
						item.todo = [];
						item.todo = JSON.parse(JSON.stringify(tempListTodo));
						displayMassagesTodo();
						localStorage.setItem('dateArray', JSON.stringify(dateArray));
						//localStorage.setItem('addListChapter', JSON.stringify(chapterList));
					}
					else if (!item.content.checked) {
						dateArray.forEach(function (item, i) {
							let tempListTodo = [];
							item.todo.forEach(function (item) {
								if (!item.content.checked) {
									tempListTodo.push(item);
								}
							})
							item.todo = [];
							item.todo = JSON.parse(JSON.stringify(tempListTodo));
							displayMassagesTodo();
							localStorage.setItem('dateArray', JSON.stringify(dateArray));
							//localStorage.setItem('addListChapter', JSON.stringify(chapterList));
						})
					};
				})
			}
		})
	}
})


document.addEventListener("click", menu);

function menu(event) {
	if (event.target.closest('.icon-menu')) {
		let iconMenu = document.querySelector('.icon-menu')
		iconMenu.classList.toggle('active')
		let menuBody = document.querySelector('.menu__body')
		menuBody.classList.toggle('active')
		let iconMenuCildren = iconMenu.children
		for (let element of iconMenuCildren) {
			element.classList.toggle('active');
		}
		let todoMain = document.querySelector('.main-screen__todo')
		let calendarMain = document.querySelector('.main-screen__calendar')

	}
}
document.addEventListener("click", todoView);

function todoView(event) {
	if (event.target.closest('.todo__view')) {
		let todoView = document.querySelector('.todo__view')
		todoView.classList.toggle('active')
		let todoViewCildren = todoView.children
		for (let element of todoViewCildren) {
			element.classList.toggle('active');
		}
		displayMassagesChapter()
		displayMassagesTodo()
	}
}
document.addEventListener("click", chapter);

function chapter(event) {
	if (event.target.closest('.chapter__move')) {
		let chapterButton = document.querySelector('.chapter__move')
		chapterButton.classList.toggle('active')
		let chapterBlock = document.querySelector('.chapter__block')
		chapterBlock.classList.toggle('active')
		let chapterWrapper = document.querySelector('.chapter__wrapper')
		chapterWrapper.classList.toggle('active')
		let chapterButtonCildren = chapterButton.children
		for (let element of chapterButtonCildren) {
			element.classList.toggle('active');
		}
	}
}
document.addEventListener("click", aroundButton);

function aroundButton(event) {
	if (event.target.closest('.main-screen__button')) {
		let aroundButton = document.querySelector('.main-screen__button')
		aroundButton.classList.toggle('active')
		let aroundButtonCildren = aroundButton.children
		for (let element of aroundButtonCildren) {
			element.classList.toggle('active');
		}
		if (aroundButton.classList.contains('active')) {
			document.querySelector('.main-screen__calendar').style.display = 'none'
			document.querySelector('.main-screen__todo').style.display = 'block'
		}
		if (!aroundButton.classList.contains('active')) {
			document.querySelector('.main-screen__calendar').style.display = 'block'
			document.querySelector('.main-screen__todo').style.display = 'none'
		}
	}
}
window.addEventListener('resize', function () {
	if (window.matchMedia('(min-width: 1456px)')) {
		document.querySelector('.main-screen__calendar').style.display = ''
		document.querySelector('.main-screen__todo').style.display = ''
		document.querySelector('.main-screen__calendar').style.flex = ''
		document.querySelector('.main-screen__todo').style.flex = ''
	}
})


















/*
let addMassage = document.querySelector('.tasks__text'),
	addButton = document.querySelector('.tasks__button'),
	addList = document.querySelector('.tasks__list'),
	deleteButton = document.querySelector('.tasks__delete');

let addMassageChapter = document.querySelector('.chapter__text'),
	addButtonChapter = document.querySelector('.chapter__button'),
	addListChapter = document.querySelector('.chapter__list'),
	deleteButtonChapter = document.querySelector('.chapter__delete');

let todoList = [];
if (localStorage.getItem('addList')) {
	todoList = JSON.parse(localStorage.getItem('addList'));
	displayMassages();
}
let chapterList = [];
if (localStorage.getItem('addListChapter')) {
	chapterList = JSON.parse(localStorage.getItem('addListChapter'));
	displayMassagesChapter();
}

addButton.addEventListener("click", function () {
	if (!addMassage.value) return;
	chapterList.forEach(function (item, i) {
		if (item.content.checked) {
			console.log(item)
			let newTodo = {
				value: addMassage.value,
				checked: false,
				important: false,
			};
			item.todo.push(newTodo);
			addList.innerHTML = item.todo;
			//displayMassages();
			//chapterList = JSON.parse(localStorage.getItem('addListChapter'));
			localStorage.setItem('addList', JSON.stringify(chapterList));
			addMassage.value = '';
			return;

		}
		//else {
		//	let newTodo = {
		//		value: addMassage.value,
		//		checked: false,
		//		important: false,
		//	};
		//	todoList.push(newTodo);
		//	displayMassages();
		//	localStorage.setItem('addList', JSON.stringify(todoList));
		//	addMassage.value = ''
		//}

	})
	let newTodo = {
		value: addMassage.value,
		checked: false,
		important: false,
	};
	todoList.push(newTodo);
	displayMassages();
	localStorage.setItem('addList', JSON.stringify(todoList));
	addMassage.value = ''

})
addButtonChapter.addEventListener("click", function () {
	if (!addMassageChapter.value) return;
	let newChapter = {
		value: addMassageChapter.value,
		checked: false,
		important: false,
	};
	let newChapterBox = {
		title: newChapter.value,
		content: newChapter,
		todo: [],
	};
	chapterList.push(newChapterBox);
	displayMassagesChapter();
	localStorage.setItem('addListChapter', JSON.stringify(chapterList));
	addMassageChapter.value = '';
})

function displayMassages() {
	let displayMassage = '';
	if (todoList.length === 0) {
		addList.innerHTML = '';
	}
	todoList.forEach(function (item, i) {
		displayMassage += `
		<li>
			<input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
			<label for='item_${i}' class="${item.important ? 'important' : ''}">${item.value}</label>
		</li>
		`
		addList.innerHTML = displayMassage;
	})

}
//function displayMassages() {
//	let displayMassage = item.todo;
//
//}

function displayMassagesChapter() {
	let displayMassageChapter = '';
	if (chapterList.length === 0) {
		addListChapter.innerHTML = '';
	}
	chapterList.forEach(function (item, i) {
		displayMassageChapter += `
		<li>
			<input type='radio' id='item_${i}' ${item.content.checked ? 'checked' : ''}>
			<label for='item_${i}'}">${item.content.value}</label>
		</li>
		`
		addListChapter.innerHTML = displayMassageChapter;
	}) 
		//displayMassageChapter += `
		//<li>
		//	<input type='radio' id='item_${i}' ${item.checked ? 'checked' : ''}>
		//	<label for='item_${i}'}">${item.value}</label>
		//</li>
		//`
		//addListChapter.innerHTML = displayMassageChapter;
}


addListChapter.addEventListener('click', function (event) {
	chapterList.forEach(function (item, i) {
		item.content.checked = false;
		displayMassagesChapter();
		//console.log(chapterList)
		if (event.target.getAttribute('for').replace(/\D/g, '') == i) {
			//console.log(item)
			item.content.checked = !item.content.checked;
			displayMassagesChapter();
			localStorage.setItem('addListChapter', JSON.stringify(chapterList));
		}
	})

})
addList.addEventListener('change', function (event) {
	todoList.forEach(function (item, i) {
		if (event.target.getAttribute('id').replace(/\D/g, '') == i) {
			//console.log(item)
			item.checked = !item.checked;
			displayMassages();
			localStorage.setItem('addList', JSON.stringify(todoList));
		}
	})
})

addList.addEventListener('contextmenu', function (event) {
	event.target.classList.toggle('important')
	event.preventDefault();
	todoList.forEach(function (item, i) {
		if (event.target.getAttribute('for').replace(/\D/g, '') == i //item.value === event.target.innerHTML) {
			item.important = !item.important
			displayMassages();
			localStorage.setItem('addList', JSON.stringify(todoList));
		}
	})

})

deleteButton.addEventListener('click', function (event) {
	let tempList = [];
	todoList.forEach(function (item) {
		if (!item.checked) {
			tempList.push(item);
		}
	});
	todoList = [];
	todoList = JSON.parse(JSON.stringify(tempList));
	displayMassages();
	localStorage.setItem('addList', JSON.stringify(todoList));
})
deleteButtonChapter.addEventListener('click', function (event) {

	let tempListChapter = [];
	chapterList.forEach(function (item) {
		if (!item.content.checked) {
			tempListChapter.push(item);
		}
	});
	chapterList = [];
	chapterList = JSON.parse(JSON.stringify(tempListChapter));
	displayMassagesChapter();
	localStorage.setItem('addListChapter', JSON.stringify(chapterList));

})*/

/*
let testObj = {
	a: 5,
	b: { g: 8, y: 9, t: { q: 48 } },
	x: 47,
	l: { f: 85, p: { u: 89, m: 7 }, s: 71 },
	r: { h: 9, a: 'test', s: 'test2' }
};
let clonedObj = cloneObj(testObj);
function cloneObj(obj) {
	let clObj = {};
	for (let i in obj) {
		if (obj[i] instanceof Object) {
			clObj[i] = cloneObj(obj[i]);
			continue;
		}
		clObj[i] = obj[i]
	}
	return clObj;
}
clonedObj.a = 45;
console.log(clonedObj);
*/