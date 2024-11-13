import { test, expect } from '@playwright/test';

test('Login Fail', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByPlaceholder('Nombre de usuario').click();
  await page.getByPlaceholder('Nombre de usuario').fill('1111111111');
  await page.locator('.ant-input-affix-wrapper').click();
  await page.getByPlaceholder('Contraseña').click();
  await page.getByPlaceholder('Contraseña').fill('asdasdasd');
  await page.getByRole('button', { name: 'Ingresar' }).click();
  await expect(page.locator('form')).toContainText('Usuario o contraseña incorrecta');

});
test('Login Correcto', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByPlaceholder('Nombre de usuario').click();
  await page.getByPlaceholder('Nombre de usuario').fill('0105599385');
  await page.locator('.ant-input-affix-wrapper').click();
  await page.getByPlaceholder('Contraseña').click();
  await page.getByPlaceholder('Contraseña').fill('asd');
  await page.getByRole('button', { name: 'Ingresar' }).click();
  await expect(page.locator('h1')).toContainText('Unidad de Diagnóstico, Investigación Psicopedagógica y Apoyo a la Inclusión (UDIPSAI)');
});