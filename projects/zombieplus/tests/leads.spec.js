// @ts-check
const { test, expect } = require ("@playwright/test");
const { LandingPage } = require("./pages/LandingPage");

/* ============================================================
   📘 Cheatsheet de Seletores Playwright
   ============================================================

   🔹 ByRole → Seleciona elementos pela função (acessibilidade)
       Ex: botões, links, campos de texto
       page.getByRole('button', { name: 'Enviar' })

   🔹 ByText → Seleciona pelo texto visível na tela
       page.getByText('Enviar agora')

   🔹 ByPlaceholder → Seleciona inputs pelo texto de placeholder
       page.getByPlaceholder('Digite seu nome')

   🔹 Locator → Seleciona usando CSS ou XPath
       page.locator('#id'), page.locator('input[name=email]')

   🔹 XPath direto → Seleção baseada em caminho XPath
       page.click('//button[text()="Enviar"]')

   🔹 ByTestId → Seleciona pelo atributo data-testid
       page.getByTestId('modal')

   ============================================================ */

test("Deve cadastrar um lead na fila de espera", async ({ page }) => {

    const landingPage = new LandingPage(page)

    await landingPage.visit()
    await landingPage.openLeadModal()
    await landingPage.submitLeadForm('Robertinho Zero Dois', 'robertinho@yahoo.com')

    const message = "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!";
    await landingPage.toastHaveText(message)
});

test("Não deve cadastrar com e-mail incorreto", async ({ page }) => {

    const landingPage = new LandingPage(page)

    await landingPage.visit()
    await landingPage.openLeadModal()
    await landingPage.submitLeadForm('Robertinho Zero Dois', 'robertinho.com.br')
    await landingPage.alertHaveText('Email incorreto')

});

test("Não deve cadastrar quando o nome não é preenchido", async ({ page }) => {

    const landingPage = new LandingPage(page)

    await landingPage.visit()
    await landingPage.openLeadModal()
    await landingPage.submitLeadForm('', 'robertinho@yahoo.com.br') 
    await landingPage.alertHaveText('Campo obrigatório')

});

test("Não deve cadastrar quando o email não é preenchido", async ({ page }) => {

    const landingPage = new LandingPage(page)

    await landingPage.visit()
    await landingPage.openLeadModal()
    await landingPage.submitLeadForm('Robertinho Zero Dois', '') 
    await landingPage.alertHaveText('Campo obrigatório')

});

test("Não deve cadastrar quando nenhum campo é preenchido", async ({ page }) => {

    const landingPage = new LandingPage(page)

    await landingPage.visit()
    await landingPage.openLeadModal()
    await landingPage.submitLeadForm('', '')
    await landingPage.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])

});