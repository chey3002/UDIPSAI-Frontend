import { test, expect } from '@playwright/test';

test('Sedes Completo', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByPlaceholder('Nombre de usuario').click();
  await page.getByPlaceholder('Nombre de usuario').fill('0105599385');
  await page.locator('.ant-input-affix-wrapper').click();
  await page.getByPlaceholder('Contraseña').click();
  await page.getByPlaceholder('Contraseña').fill('asd');
  await page.getByRole('button', { name: 'Ingresar' }).click();
  await page.getByRole('link', { name: 'Sedes' }).click();
  await page.goto('http://localhost:3000/sedes');
  await page.getByRole('link', { name: 'Sedes' }).click();
  await page.getByRole('button', { name: ' Nueva Sede' }).click();
  await page.getByLabel('Nombre').click();
  await page.getByLabel('Nombre').fill('Test Sede');
  await page.getByRole('button', { name: 'OK' }).click();
  await expect(page.locator('body')).toContainText('Sede creada correctamente');
  await expect(page.locator('tbody')).toContainText('TEST SEDE');
  await page.getByRole('row', { name: 'TEST SEDE Activo  Editar ' }).getByRole('button').first().click();
  await page.getByLabel('Nombre').click();
  await page.getByLabel('Nombre').fill('TEST SEDEs');
  await page.getByRole('button', { name: 'OK' }).click();
  await expect(page.locator('tbody')).toContainText('TEST SEDES');
  await page.getByRole('row', { name: 'TEST SEDES Activo  Editar ' }).getByRole('button').nth(1).click();
  await page.getByRole('button', { name: 'Si' }).click();
  await expect(page.locator('body')).toContainText('Sede eliminada correctamente');
});