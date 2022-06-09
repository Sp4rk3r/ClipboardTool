const axios = require('axios');
function reload() {
				/* Load the text content of the clipboard */
				var text = clipboardData.getData("Text");

				if (text != null) {
					/* Remove the message "Nothing found in the clipboard" or "x lines" if it is there. */
					document.getElementById("clipboard").innerHTML = "";

					/* Replace Unix's new line by Microsoft Windows's carriage return new line  */
					text = text.replace(/\n/g, "\r\n");
					text = text.replace(/\r\r/g, "\r");
					/* Replace Apple MacOS <= 9's carriage return by Microsoft Windows's carriage return new line */
					text = text.replace(/\r/g, "\r\n");
					text = text.replace(/\n\n/g, "\n");

					/* Remove the final newline if text ends in newline */
					text = text.replace(/\r\n$/g, "");
				

					/* If text is not null, load the text content of the clipboard into the textarea "field" */
					document.getElementById("field").value = text;

					count();
				}
				else {
					document.getElementById("clipboard").style.color = "rgb(255, 0, 0)"; /* Red */
					document.getElementById("clipboard").innerHTML = "Nothing found in the clipboard";
				}
			}

			function count() {
				var text = document.getElementById("field").value;				
				var lines =  text.split(/\r*\n/); 
				var lineCount = lines.length; 
				
				document.getElementById("clipboard").style.color = "rgb(0, 0, 0)"; /* Black */
				document.getElementById("clipboard").innerHTML = lineCount + (lineCount == 1 ? " line" : " lines");
			}

			function text() {
				var text = document.getElementById("field").value;

				//end(text);
				navigator.clipboard.writeText(text).then(function() {
				  console.log('Async: Copying to clipboard was successful!');
				  document.getElementById("copyClib").innerHTML = "Copying to clipboard was successful!"
				}, function(err) {
				  console.error('Async: Could not copy text: ', err);
				  document.getElementById("copyClib").innerHTML = "Could not copy text: " + err
				});
			}

			function addE() {
				var text = document.getElementById("field").value;

				/* Change "1\n2\n3" into "1e\n2e\n3e" to make Excel interpret the numbers as strings */
				/* SVDH - 10/03/2015 - Jarl is the man*/
				text = text.replace(/(?:\r\n|\r|\n)/g, "e\r\n");
				text = text + "e";

				end(text);
			}

			function list() {
				var text = document.getElementById("field").value;

				/* Change "1\n2\n3" into "('1', '2', '3')" to use in SQL IN statements. */
				/*text = text.replace(/\r\n/g, "', '");
				JVDB - 10/03/2015 - I'm the man*/
				text = text.replace(/(?:\r\n|\r|\n)/g, "', '");
				text = "(\'" + text + "\')";

				end(text);
			}
			
			function listId() {
				var text = document.getElementById("field").value;

				/* Change "1\n2\n3" into "(1, 2, 3)" to use in SQL IN statements. */
				/*text = text.replace(/\r\n/g, "', '");*/
				text = text.replace(/(?:\r\n|\r|\n)/g, ", ");
				text = "(" + text + ")";
				//text = text.replace(''/'', '');

				end(text);
			}

			function siebelQuery() {
				var text = document.getElementById("field").value;

				/* Change "1\n2\n3" into "1 OR 2 OR 3" to use in Siebel queries */
				/* SVDH - 10/03/2015 - Jarl is the man*/
				text = text.replace(/(?:\r\n|\r|\n)/g, " OR ");
				end(text);
			}

			function evalScript() {
				var text = document.getElementById("field").value;

				/* Evaluate the script in the textarea "script" */
				eval(document.getElementById("script").value);

				var success = clipboardData.setData("Text", text);
				reload();
			}

			function end(text) {
				document.getElementById("field").value = text;

				var success = clipboardData.setData("Text", text);
				/* Only close the window if text is written to the clipboard and the checkbox "closeAfterScript" is checked */
				if (success && document.getElementById("closeAfterScript").checked) {
					/* Hack to avoid Microsoft Internet Explorer confirmation of windows.close() */
					window.opener = window;

					window.close();
				}
				else if (success) {
					reload();
				}
			}

			function replace(text, search, replaceBy) {
				if (search.length == 0) {
					return this;
				}
				var index = text.indexOf(search);
				if (index == -1) {
					return text;
				}
				else {
					return text.substring(0, index) + replaceBy + replace(text.substring(index + search.length), search, replaceBy);
				}
			}
			
			function postnl(text) {
				var text = document.getElementById("field").value;

				/* Change "1\n2\n3" into "('1', '2', '3')" to use in SQL IN statements. */
				/*text = text.replace(/\r\n/g, "', '");
				JVDB - 10/03/2015 - I'm the man*/
				text = text.replace(/^/gm, "exec ops.ResubmitDocumentToPostNL ");
				/*text = text.replace(text, "" + text);*/
				

				end(text);
			}
			
			function enter(text) {
				var text = document.getElementById("field").value;

				/* Change "1\n2\n3" into "('1', '2', '3')" to use in SQL IN statements. */
				/*text = text.replace(/\r\n/g, "', '"); text = text.replace("," /(?:\r\n|\r|\n)/g);
				JVDB - 10/03/2015 - I'm the man*/
				text = text.split(",").join("\n")
				
				/*text = text.replace(text, "" + text);*/
				console.log(text)

				end(text);
			}
			
			function epochToHuman(text) {
				var text = document.getElementById("field").value;
				
				var myDate = new Date( text *1000);
				//document.write(myDate.toGMTString()+"<br>"+myDate.toLocaleString());
				console.log(myDate.toGMTString()+" - "+myDate.toLocaleString())
				
				text = (myDate.toGMTString()+" - "+myDate.toLocaleString())
				end(text)
			}
			
			function HumanToEpoch(text) {
				var text = document.getElementById("field").value;
				
				var myDate = new Date(text); // Your timezone!
				var myEpoch = myDate.getTime()/1000.0;
				//document.write(myEpoch);
				
				text = myEpoch
				end(text)
			}

			function over(object) {
				object.style.background = "rgb(228, 228, 228)";
				object.style.border = "2px inset"; 
			}

			function out(object) {
				object.style.background = "rgb(200, 200, 200)";
				object.style.border = "2px solid rgb(200, 200, 200)";
			}
			
			function clear(text) {		
				
				text = document.getElementById("field").value;
				text.replace(/^/gm,'');
				
				end(text);
				
			}
			function emailVerify(data) {
				var text = document.getElementById("field").value;
				fetch("https://email-checker.p.rapidapi.com/verify/v1?email=" + text, {
				"method": "GET",
				"headers": {
					"x-rapidapi-key": "b25eaa2d87msh4e42e3dcbe21077p19b7f2jsnb03516f2b04e",
					"x-rapidapi-host": "email-checker.p.rapidapi.com"
				}
				})
				.then(response => {			
					return response.json()
				})
				.then(data =>
				{
					document.getElementById("data-field").innerHTML = JSON.stringify(data, null, " ")
						
				})					
				.catch(err => {
					console.error(err);
				});
			}
			function decode() {
				var text = document.getElementById("field").value;
				
				text = atob(text);
				console.log(text);
				text = text.replace('ï»¿', '');
				//document.getElementById("field").innerHTML = atob(text);
				end(text)
			}

			function readXML()
			{
				var text = document.getElementById("field").value;
				var parser = new DOMParser();  
				var xmlDoc = parser.parseFromString(text, "text/xml");  
				arrayOfElements = xmlDoc.getElementsByTagName("VKONT");
				
				document.getElementById("data-field").innerHTML = "VKONT: " + JSON.stringify(arrayOfElements[0].childNodes[0].nodeValue);
			}
			
			function vkont() {
				var text = document.getElementById("field").value;
				
				text = text.replace(/^/gm, "0000");
				end(text);
			}
			
			
