import express from 'express';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import { randomUUID } from 'node:crypto';
import fs from 'fs';

import handleFormatData from './utils/data-formatting-for-the-engineering-template.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.post('/pdf', async(request, response) => {
	try {	
		if(request.is('json')) {
			const requestData = request.body;
			const data = handleFormatData(
				requestData.inspectionLevel,
				requestData.basicInformations,
				requestData.categoriesAndSubCategories,
				requestData.activitySchedules,
				requestData.documents,
				requestData.precautionsInPrivateAreas,
				requestData.anomaliesAndFailuresClassificationList,
				requestData.introductionTextContent,
				requestData.testsCarriedOutTextContent,
				requestData.assessmentOfMaintenanceAndUseTextContent,
				requestData.conclusionTextContent
			);

			const browser = await puppeteer.launch({
				headless: 'new', 
				args: ['--no-sandbox', '--disable-setuid-sandbox'],
				userDataDir: "/usr/bin/chromium"
			})
			const page = await browser.newPage()
			const __reportFileName = randomUUID();
			const timeout = 11000;
			const pdfPath = path.join(__dirname, `/temp/${__reportFileName}.pdf`);
			const filePath = path.join(__dirname, "/templates/Ceara_Inspecao/index.ejs");

			const timeoutPromise = new Promise((_, reject) => {
				setTimeout(() => {
					reject(new Error(`Timeout de ${timeout}ms atingido`));
				}, timeout);
			});
			
			try {
				let templateHTML = "";

				page.on('console', message => console.log(`${message.type().toUpperCase()} ${message.text()}`));
				
				await ejs.renderFile(filePath, { data }, (err, html) => {
					if (err) {
						return res.status(500).send('Error on template building')
					}

					templateHTML = html;
				});

				const pdfPromise = await page.setContent(templateHTML, { waitUntil: 'networkidle0' })
					.then(async () => await page.pdf({ 
						path: pdfPath,
						printBackground: true,
						format: 'a4',
						scale: 2,
						path: pdfPath,
				}));
			
				await Promise.race([pdfPromise, timeoutPromise]);
			} finally {
				await browser.close();
			}
			
			response.contentType('application/pdf');
			
			return response.download(pdfPath, `relatorio-${requestData.basicInformations.id}.pdf`, (err, response) => {
				if (err) {
					return response.send(err.message);
				}
		
				fs.rm(pdfPath, { recursive:true }, (err) => {
					if(err){
						console.error(err.message);	
						return;
					}
				})
			})
		} else {
			return res.status(400).send('The request must contain a JSON body');
		}  
	} catch (error) {
		return res.status(500).send(error.message);
	}  
})


app.post('/preview', (request, response) => {
	try {
		if(request.is('json')) {
			const filePath = path.join(__dirname, "/templates/Ceara_Inspecao/index.ejs");
			const requestData = request.body;
			const data = handleFormatData(
				requestData.inspectionLevel,
				requestData.basicInformations,
				requestData.categoriesAndSubCategories,
				requestData.activitySchedules,
				requestData.documents,
				requestData.precautionsInPrivateAreas,
				requestData.anomaliesAndFailuresClassificationList,
				requestData.introductionTextContent,
				requestData.testsCarriedOutTextContent,
				requestData.assessmentOfMaintenanceAndUseTextContent,
				requestData.conclusionTextContent
			);
			
			try {
				ejs.renderFile(filePath, { data }, (err, data) => {
				if(err) {
					return response.send("Error reading the file" + err);
				}
				
				return response.send(data);
				})
			} catch (error) {
				return response.send(error.message);
			}    
		} else {
			return res.status(400).send('The request must contain a JSON body');
		} 
	} catch (error) {
		return res.status(500).send(error.message);
	}  
});

app.listen(3000)
