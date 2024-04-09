export default function handleFormatData(
    inspectionLevel,
    basicInformations,
    categoriesAndSubCategories,
    activitySchedules,
    documents,
    precautionsInPrivateAreas,
    anomaliesAndFailuresClassificationList,
    introductionTextContent,
    testsCarriedOutTextContent,
    assessmentOfMaintenanceAndUseTextContent,
    conclusionTextContent
) {
    function handleCreateActivitySchedulesTable() {
        const tableColumnTitles = ['PRIORIDADE', 'PROBLEMA', 'AÇÃO', 'PRAZO'];
    
        let tbodyContainer = "";            
        let tableHeadRow = "";
    
        tableColumnTitles.forEach(element => {
            const tableCell = "<th>" + element + "</th>";
            tableHeadRow += tableCell;
        });
    
        const theadContainer = "<thead><tr>" + tableHeadRow + "</tr></thead>";
    
        activitySchedules.forEach((element, index) => {
            let tableRows = "";
            const tableCellsContent = [];
    
            for (const key in element) {
                if (Object.hasOwnProperty.call(element, key)) {
                    tableCellsContent.push(element[key]);                
                }
            }
    
            tableRows += "<td>" + `${index + 1}°` + "</td>";
            tableRows += "<td>" + tableCellsContent[0] + "</td>";
            tableRows += "<td>" + "Seguir procedimento feitos na página " + "</td>";
            tableRows += "<td>" + tableCellsContent[1] + "</td>";
    
            tbodyContainer += "<tr>" + tableRows + "</tr>";
        });
    
        const tableContainer = "<table>" + theadContainer + "<tbody>" + tbodyContainer + "</tbody>" + "</table>";
    
        return tableContainer;
    }
    
    function handleAttachedDocuments(attachedDocumentsList) {
        const attachedDocumentsReceived = attachedDocumentsList.filter(function(item) {
            return item.status === true;
        })
    
        let orderedDocumentsList = '<ol> <li>ART do elaborador do laudo;</li>';
    
        for(let index = 0; index < attachedDocumentsReceived.length; index++) {
            const itemList = '<li>' + attachedDocumentsReceived[index].description + ";</li>";
            
            orderedDocumentsList += itemList;
        };
    
        return encodeURIComponent(orderedDocumentsList + "</ol>");
    }
    
    function handleCreateTable(documents) {
        const tableColumnTitles = ['ITEM', 'DESCRIÇÃO', 'DOCUMENTO APRESENTADO', 'DATA DE EMISSÃO', 'VALIDADE DO DOCUMENTO', 'OBSERVAÇÕES'];
        const svgTrueIcon = `<svg width="55" height="13" viewBox="0 0 55 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.2084 4L16.6251 8.58333L14.5417 6.5" stroke="#299764" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M27.3242 7.13672L28.4492 7.02734C28.5169 7.40495 28.6536 7.68229 28.8594 7.85938C29.0677 8.03646 29.3477 8.125 29.6992 8.125C30.0716 8.125 30.3516 8.04688 30.5391 7.89062C30.7292 7.73177 30.8242 7.54688 30.8242 7.33594C30.8242 7.20052 30.7839 7.08594 30.7031 6.99219C30.625 6.89583 30.487 6.8125 30.2891 6.74219C30.1536 6.69531 29.8451 6.61198 29.3633 6.49219C28.7435 6.33854 28.3086 6.14974 28.0586 5.92578C27.707 5.61068 27.5312 5.22656 27.5312 4.77344C27.5312 4.48177 27.6133 4.20964 27.7773 3.95703C27.944 3.70182 28.1823 3.50781 28.4922 3.375C28.8047 3.24219 29.181 3.17578 29.6211 3.17578C30.3398 3.17578 30.8802 3.33333 31.2422 3.64844C31.6068 3.96354 31.7982 4.38411 31.8164 4.91016L30.6602 4.96094C30.6107 4.66667 30.5039 4.45573 30.3398 4.32812C30.1784 4.19792 29.9349 4.13281 29.6094 4.13281C29.2734 4.13281 29.0104 4.20182 28.8203 4.33984C28.6979 4.42839 28.6367 4.54688 28.6367 4.69531C28.6367 4.83073 28.694 4.94661 28.8086 5.04297C28.9544 5.16536 29.3086 5.29297 29.8711 5.42578C30.4336 5.55859 30.849 5.69661 31.1172 5.83984C31.388 5.98047 31.599 6.17448 31.75 6.42188C31.9036 6.66667 31.9805 6.97005 31.9805 7.33203C31.9805 7.66016 31.8893 7.96745 31.707 8.25391C31.5247 8.54036 31.2669 8.75391 30.9336 8.89453C30.6003 9.03255 30.1849 9.10156 29.6875 9.10156C28.9635 9.10156 28.4076 8.9349 28.0195 8.60156C27.6315 8.26562 27.3997 7.77734 27.3242 7.13672ZM32.9453 4.28906V3.27344H34.043V4.28906H32.9453ZM32.9453 9V4.85156H34.043V9H32.9453ZM35.0898 4.85156H36.1016V5.41797C36.4635 4.97786 36.8945 4.75781 37.3945 4.75781C37.6602 4.75781 37.8906 4.8125 38.0859 4.92188C38.2812 5.03125 38.4414 5.19661 38.5664 5.41797C38.7487 5.19661 38.9453 5.03125 39.1562 4.92188C39.3672 4.8125 39.5924 4.75781 39.832 4.75781C40.1367 4.75781 40.3945 4.82031 40.6055 4.94531C40.8164 5.06771 40.974 5.2487 41.0781 5.48828C41.1536 5.66536 41.1914 5.95182 41.1914 6.34766V9H40.0938V6.62891C40.0938 6.21745 40.056 5.95182 39.9805 5.83203C39.8789 5.67578 39.7227 5.59766 39.5117 5.59766C39.3581 5.59766 39.2135 5.64453 39.0781 5.73828C38.9427 5.83203 38.8451 5.97005 38.7852 6.15234C38.7253 6.33203 38.6953 6.61719 38.6953 7.00781V9H37.5977V6.72656C37.5977 6.32292 37.5781 6.0625 37.5391 5.94531C37.5 5.82812 37.4388 5.74089 37.3555 5.68359C37.2747 5.6263 37.1641 5.59766 37.0234 5.59766C36.8542 5.59766 36.7018 5.64323 36.5664 5.73438C36.431 5.82552 36.3333 5.95703 36.2734 6.12891C36.2161 6.30078 36.1875 6.58594 36.1875 6.98438V9H35.0898V4.85156Z" fill="#299764"/></svg>`;
        const svgFalseIcon = `<svg width="55" height="14" viewBox="0 0 55 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.875 4.5L14.875 9.5M14.875 4.5L19.875 9.5" stroke="#C62A2F" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M27.4062 9.5V3.77344H28.5312L30.875 7.59766V3.77344H31.9492V9.5H30.7891L28.4805 5.76562V9.5H27.4062ZM33.9883 6.61719L32.9922 6.4375C33.1042 6.03646 33.2969 5.73958 33.5703 5.54688C33.8438 5.35417 34.25 5.25781 34.7891 5.25781C35.2786 5.25781 35.6432 5.31641 35.8828 5.43359C36.1224 5.54818 36.2904 5.69531 36.3867 5.875C36.4857 6.05208 36.5352 6.37891 36.5352 6.85547L36.5234 8.13672C36.5234 8.5013 36.5404 8.77083 36.5742 8.94531C36.6107 9.11719 36.6771 9.30208 36.7734 9.5H35.6875C35.6589 9.42708 35.6237 9.31901 35.582 9.17578C35.5638 9.11068 35.5508 9.06771 35.543 9.04688C35.3555 9.22917 35.1549 9.36589 34.9414 9.45703C34.7279 9.54818 34.5 9.59375 34.2578 9.59375C33.8307 9.59375 33.4935 9.47786 33.2461 9.24609C33.0013 9.01432 32.8789 8.72135 32.8789 8.36719C32.8789 8.13281 32.9349 7.92448 33.0469 7.74219C33.1589 7.55729 33.3151 7.41667 33.5156 7.32031C33.7188 7.22135 34.0104 7.13542 34.3906 7.0625C34.9036 6.96615 35.2591 6.8763 35.457 6.79297V6.68359C35.457 6.47266 35.4049 6.32292 35.3008 6.23438C35.1966 6.14323 35 6.09766 34.7109 6.09766C34.5156 6.09766 34.3633 6.13672 34.2539 6.21484C34.1445 6.29036 34.056 6.42448 33.9883 6.61719ZM35.457 7.50781C35.3164 7.55469 35.0938 7.61068 34.7891 7.67578C34.4844 7.74089 34.2852 7.80469 34.1914 7.86719C34.0482 7.96875 33.9766 8.09766 33.9766 8.25391C33.9766 8.40755 34.0339 8.54036 34.1484 8.65234C34.263 8.76432 34.4089 8.82031 34.5859 8.82031C34.7839 8.82031 34.9727 8.75521 35.1523 8.625C35.2852 8.52604 35.3724 8.40495 35.4141 8.26172C35.4427 8.16797 35.457 7.98958 35.457 7.72656V7.50781ZM33.9805 4.79297H33.4805C33.4779 4.73307 33.4766 4.6862 33.4766 4.65234C33.4766 4.37891 33.543 4.16927 33.6758 4.02344C33.8086 3.875 33.9792 3.80078 34.1875 3.80078C34.2786 3.80078 34.3633 3.8112 34.4414 3.83203C34.5195 3.85026 34.6615 3.90625 34.8672 4C35.0755 4.09115 35.2383 4.13672 35.3555 4.13672C35.4388 4.13672 35.5078 4.11068 35.5625 4.05859C35.6198 4.00651 35.6562 3.91927 35.6719 3.79688H36.1797C36.1771 4.14844 36.1107 4.39974 35.9805 4.55078C35.8529 4.70182 35.6875 4.77734 35.4844 4.77734C35.3958 4.77734 35.3086 4.76823 35.2227 4.75C35.1628 4.73438 35.013 4.68099 34.7734 4.58984C34.5339 4.4987 34.3594 4.45312 34.25 4.45312C34.1667 4.45312 34.1016 4.47917 34.0547 4.53125C34.0078 4.58073 33.9831 4.66797 33.9805 4.79297ZM37.3672 7.36719C37.3672 7.0026 37.457 6.64974 37.6367 6.30859C37.8164 5.96745 38.0703 5.70703 38.3984 5.52734C38.7292 5.34766 39.0977 5.25781 39.5039 5.25781C40.1315 5.25781 40.6458 5.46224 41.0469 5.87109C41.4479 6.27734 41.6484 6.79167 41.6484 7.41406C41.6484 8.04167 41.4453 8.5625 41.0391 8.97656C40.6354 9.38802 40.1263 9.59375 39.5117 9.59375C39.1315 9.59375 38.7682 9.50781 38.4219 9.33594C38.0781 9.16406 37.8164 8.91276 37.6367 8.58203C37.457 8.2487 37.3672 7.84375 37.3672 7.36719ZM38.4922 7.42578C38.4922 7.83724 38.5898 8.15234 38.7852 8.37109C38.9805 8.58984 39.2214 8.69922 39.5078 8.69922C39.7943 8.69922 40.0339 8.58984 40.2266 8.37109C40.4219 8.15234 40.5195 7.83464 40.5195 7.41797C40.5195 7.01172 40.4219 6.69922 40.2266 6.48047C40.0339 6.26172 39.7943 6.15234 39.5078 6.15234C39.2214 6.15234 38.9805 6.26172 38.7852 6.48047C38.5898 6.69922 38.4922 7.01432 38.4922 7.42578Z" fill="#C62A2F"/></svg>`;
    
        let tbodyContainer = "";            
        let tableHeadRow = "";
    
        tableColumnTitles.forEach(element => {
            const tableCell = "<th>" + element + "</th>";
            tableHeadRow += tableCell;
        });
    
        const theadContainer = "<thead><tr>" + tableHeadRow + "</tr></thead>";
    
        documents.forEach(element => {
            let tableRows = "";
            const tableCellsContent = [];
    
            for (const key in element) {
                if (Object.hasOwnProperty.call(element, key)) {
                    tableCellsContent.push(element[key]);                
                }
            }
    
            function handleAddTableCell(content) {
                if(content === true) {
                    content = svgTrueIcon;
                } else if(content === false) {
                    content = svgFalseIcon;
                } 
    
                const tableCell = "<td>" + (content ?? "-")  + "</td>";
    
                tableRows += tableCell;
            }
    
            tableCellsContent.forEach(content => handleAddTableCell(content));    
            
            tbodyContainer += "<tr>" + tableRows + "</tr>";
        });
    
        const tableContainer = "<table>" + theadContainer + "<tbody>" + tbodyContainer + "</tbody>" + "</table>";
    
        return tableContainer;
    }
    
    function handlePhotographicReport(photographicReport) {
        let formatedPhotographicReport = "";
    
        for (let index = 0; index < photographicReport.length; index++) {
            formatedPhotographicReport += `
                <div class="photography_container">
                    <img src="${photographicReport[index].imageUrl}" />
                    <p>${photographicReport[index].imageDescription}</p>
                </div>
            `;        
        }
    
        return formatedPhotographicReport;
    }
    
    function handleAnomaliesAndFailuresClassificationList(anomaliesAndFailuresClassificationList){
        const checkedIcon = `<svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.75" width="12" height="12" rx="2" fill="#299764"/><path d="M10.0834 3.5L5.50002 8.08333L3.41669 6" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
        let fullHtmlContent = `<spam class="anomalies_and_failures_classification_list_subtitle">Estudo das anomalias e falhas por sistemas construtivos</spam>`;
    
        for (let categoryIndex = 0; categoryIndex < anomaliesAndFailuresClassificationList.length; categoryIndex++) {
            fullHtmlContent += `<h2 class="anomalies_and_failures_classification_category_name" >${anomaliesAndFailuresClassificationList[categoryIndex].categoryName}</h2>`;
            
            for (let subCategoryIndex = 0; subCategoryIndex < anomaliesAndFailuresClassificationList[categoryIndex].subCategories.length; subCategoryIndex++) {
                const subCategoryInfo = anomaliesAndFailuresClassificationList[categoryIndex].subCategories[subCategoryIndex];
    
                fullHtmlContent += `
                    <h2 class="anomalies_and_failures_classification_subcategory_name" >${subCategoryInfo.subCategoryName}</h2>
                    <div class="anomalies_and_failures_classification_main_info">                    
                        <div class="anomaly_and_failure_cards_container">
                            <table>
                                <thead><tr><th colspan="4">ANOMALIAS</th></tr></thead>
                                <tbody>
                                    <tr><td>CONSTRUTIVA</td><td>EXÓGENA</td><td>NATURAL</td><td>FUNCIONAL</td></tr>
                                    <tr>
                                        <td>Endógena: Quando relacionadas aos problemas da construção (materiais, execução) ou projetos</td>
                                        <td>Originárias de fatores externos a edificação, provocado por terceiros</td>
                                        <td>Originárias de fenômenos da natureza</td>
                                        <td>Quando relacionadas a perda de funcionalidade por final de vida útil, envelhecimento natural</td>
                                    </tr>
                                    <tr>
                                        <td>${subCategoryInfo.anomalyType === "constructive" ? checkedIcon : "-"}</td>
                                        <td>${subCategoryInfo.anomalyType === "exogenous" ? checkedIcon : "-"}</td>
                                        <td>${subCategoryInfo.anomalyType === "natural" ? checkedIcon : "-"}</td>
                                        <td>${subCategoryInfo.anomalyType === "functional" ? checkedIcon : "-"}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table>
                                <thead><tr><th>FALHAS</th></tr></thead>
                                <tbody>
                                    <tr><td>(De uso e manutenção), quando relacionada a perda precoce de desempenho por deficiência no uso e nas atividades de manutenção periódica.</td></tr>
                                    <tr><td>${subCategoryInfo.hasFailure === true ? checkedIcon : "-"}</td></tr>
                                </tbody>
                            </table>       
                        </div>
                        <div class="risk_level_and_remedial_measure_cards_container">
                            <table>
                                <thead><tr><th colspan="3">GRAU DE RISCO</th></tr></thead>
                                <tbody>
                                    <tr><td>CRÍTICO</td><td>MÉDIO</td><td>MÍNIMO</td></tr>
                                    <tr>
                                        <td>${subCategoryInfo.riskLevel === "critical" ? checkedIcon : "-"}</td>
                                        <td>${subCategoryInfo.riskLevel === "medium" ? checkedIcon : "-"}</td>
                                        <td>${subCategoryInfo.riskLevel === "minimum" ? checkedIcon : "-"}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table>
                                <thead><tr><th>PRAZO PARA MEDIDA SANEADORA</th></tr></thead>
                                <tbody><tr><td>${subCategoryInfo.deadlineInDaysForRemedialMeasure} DIAS</td></tr></tbody>
                            </table>
                        </div>
                        <div class="anomaly_location_card_container">
                            <table>
                                <thead><tr><th colspan="3">LOCALIZAÇÃO DA ANOMALIA</th></tr></thead>
                                <tbody>
                                    <tr><td>IDENTIFICAÇÃO DO LOCAL</td><td>PAVIMENTO</td><td>DESCRIÇÃO DA ANOMALIA</td></tr>
                                    <tr>
                                        <td>${subCategoryInfo.anomalyLocation.locationIdentification}</td>
                                        <td>${subCategoryInfo.anomalyLocation.pavement}</td>
                                        <td>${subCategoryInfo.anomalyLocation.anomalyDescription}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
    
                    <div class="anomalies_and_failures_classification_possible_causes_container">
                        <h3>POSSÍVEIS CAUSAS</h3>
                        <p>${subCategoryInfo.possibleCauses}</p>
                    </div>
    
                    <div class="anomalies_and_failures_classification_technical_recommendations_container">
                        <h3>RECOMENDAÇÕES TÉCNICAS</h3>
                        <div>${subCategoryInfo.technicalRecommendations}</div>
                    </div>
    
                    <div class="anomalies_and_failures_classification_maintenance_recommendations_container">
                        <h3>RECOMENDAÇÕES E MANUTENÇÕES</h3>
                        <div>${subCategoryInfo.maintenanceRecommendations}</div>
                    </div>
    
                    <div class="anomalies_and_failures_classification_photographic_report_container">
                        <h3>RELATÓRIO FOTOGRÁFICO DA ANOMALIA</h3>
                        <div>
                            ${handlePhotographicReport(subCategoryInfo.anomalyPhotographicReport)}
                        </div>
                    </div>
                `;            
            }
        }
        
        return fullHtmlContent;
    }   
    
    const tableDataArray = encodeURIComponent(JSON.stringify(categoriesAndSubCategories))
    
    const precautionsArray = encodeURIComponent(JSON.stringify(precautionsInPrivateAreas))

    const pagesInfo = {
        pages: [
            {
                pageTitle: "INTRODUÇÃO",
                pageContent: encodeURIComponent(introductionTextContent.trim() === "" ? "<p></p>" : introductionTextContent)
            },
            {
                pageTitle: "DOCUMENTOS SOLICITADOS, ENTREGUES E ANALISADOS",
                pageContent: encodeURIComponent(handleCreateTable(documents))
            },
            {
                pageTitle: "LISTA DE VERIFICAÇÃO",
                pageContent: null
            },
            {
                pageTitle: "NÍVEL DA INSPEÇÃO – RIGOR DO LAUDO",
                pageContent: null
            },
            {
                pageTitle: "GRAU DE RISCO",
                pageContent: null
            },
            {
                pageTitle: "CRITÉRIO E MÉTODO DA INSPEÇÃO PREDIAL",
                pageContent: null
            },
            {
                pageTitle: "ENSAIOS REALIZADOS",
                pageContent: encodeURIComponent(testsCarriedOutTextContent.trim() === "" ? "<p></p>" : testsCarriedOutTextContent)
            },
            {
                pageTitle: "RESPONSABILIDADES",
                pageContent: null
            },
            {
                pageTitle: "CLASSIFICAÇÃO DAS ANOMALIAS E FALHAS – ÁREAS COMUM",
                pageContent: encodeURIComponent(handleAnomaliesAndFailuresClassificationList(anomaliesAndFailuresClassificationList))
            },
            {
                pageTitle: "CUIDADOS A SEREM TOMADOS NAS ÁREAS PRIVATIVAS",
                pageContent: null
            },
            {
                pageTitle: "AVALIAÇÃO DA MANUTENÇÃO E USO",
                pageContent: encodeURIComponent(assessmentOfMaintenanceAndUseTextContent.trim() === "" ? "<p></p>" : assessmentOfMaintenanceAndUseTextContent)
            },
            {
                pageTitle: "CRONOGRAMA DE ATIVIDADE",
                pageContent: encodeURIComponent(handleCreateActivitySchedulesTable())
            },
            {
                pageTitle: "LISTA DE DOCUMENTOS ANEXOS",
                pageContent: handleAttachedDocuments(documents)
            },
            {
                pageTitle: "CONCLUSÃO",
                pageContent: encodeURIComponent(conclusionTextContent.trim() === "" ? "<p></p>" : conclusionTextContent)
            }
        ]    
    }
    
    const data = {
        documents,
        categoriesAndSubCategories,
        basicInformations,
        pagesInfo,
        inspectionLevel,
        tableDataArray,
        precautionsArray
    }

    return data;
}
