// @ts-check
import { test, expect } from '@playwright/test';

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  await page.goto('http://localhost:3000');
  //await page.click('//button[text()="Aperte o play... se tiver coragem"]')
  await page.getByRole('button', { name: 'Aperte o play... se tiver coragem' }).click();
  await page.getByPlaceholder('Seu nome completo').type('Francisco Cisco')
  await page.getByPlaceholder('Seu email principal').type('fs@zomplieplus.com')
  await page.getByRole('button', { name: 'Quero entrar na fila!' }).click()
  await page.waitForTimeout(10000)
});

