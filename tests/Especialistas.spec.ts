import { test, expect } from '@playwright/test';

test.skip('Especialistas', async ({ page }) => {
  let cedula = '1719690487'
  //https://www7.quito.gob.ec/mdmq_ordenanzas/Circulares/2017/042%20%20%20%20Respuesta%20resoluci%C3%B3n%20C%20185/BASE%20DE%20DATOS_INFORMALES.pdf
  await page.goto('http://localhost:3000/');
  await page.getByPlaceholder('Nombre de usuario').click();
  await page.getByPlaceholder('Nombre de usuario').fill('0105599385');
  await page.getByPlaceholder('Contraseña').click();
  await page.getByPlaceholder('Contraseña').fill('asd');
  await page.getByRole('button', { name: 'Ingresar' }).click();
  await page.getByRole('menuitem', { name: 'book Especialistas' }).click();
  await page.getByRole('link', { name: 'Nuevo' }).click();
  await page.getByLabel('Cédula').click();
  await page.getByLabel('Cédula').fill('1111111111111');
  await page.getByLabel('Primer Nombre').click();
  await page.getByLabel('Primer Nombre').fill('Test');

  await page.getByLabel('Segundo Nombre').click();
  await page.getByLabel('Segundo Nombre').fill('user');
  await page.getByLabel('Primer Apellido').click();
  await page.getByLabel('Primer Apellido').fill('a');
  await page.getByLabel('Contraseña', { exact: true }).click();
  await page.getByLabel('Contraseña', { exact: true }).fill('asd');
  await expect(page.locator('#contrasenaConfirm_help')).toContainText('Confirmar Contraseña');
  await expect(page.locator('#contrasena_help')).toContainText('La contraseña debe tener al menos 8 caracteres');
  await page.getByLabel('Contraseña', { exact: true }).click();
  await page.getByLabel('Contraseña', { exact: true }).fill('asdfghij');
  await page.getByLabel('Confirmar Contraseña').click();
  await page.getByLabel('Confirmar Contraseña').fill('asdfghio');
  await expect(page.locator('#contrasenaConfirm_help')).toContainText('Las contraseñas no coinciden');
  await page.getByLabel('Confirmar Contraseña').click();
  await page.getByLabel('Confirmar Contraseña').fill('asdfghij');
  await page.getByRole('button', { name: 'Registrar' }).click();
  await expect(page.locator('body')).toContainText('Cédula o RUC inválido');
  await page.getByLabel('Cédula').click();
  await page.getByLabel('Cédula').dblclick();
  await page.getByLabel('Cédula').fill(cedula);
  await page.getByRole('button', { name: 'Registrar' }).click();
  await page.getByPlaceholder('Buscar').click();
  await page.getByPlaceholder('Buscar').fill(cedula);
  await expect(page.locator('tbody')).toContainText(cedula);
  await expect(page.locator('tbody')).toContainText('a');
  await expect(page.locator('tbody')).toContainText('Test');
  await page.getByRole('button', { name: ' Más Información' }).click();

  await expect(page.locator('h1')).toContainText('Información del Especialista ' + cedula);
  await expect(page.getByRole('main')).toContainText('Cédula: ' + cedula);
  await expect(page.getByRole('main')).toContainText('Primer Nombre: Test');
  await expect(page.getByRole('main')).toContainText('Segundo Nombre: user');
  await expect(page.getByRole('main')).toContainText('Primer Apellido: a');
  await page.getByText('Especialista', { exact: true }).click();
  await page.getByRole('link', { name: 'Editar' }).click();
  await page.getByLabel('Primer Nombre').click();
  await page.getByLabel('Primer Nombre').click();
  await page.getByLabel('Primer Nombre').fill('Test user');
  await page.getByRole('button', { name: 'Editar' }).click();
  await expect(page.getByRole('main')).toContainText('Primer Nombre: Test user');
  await page.getByRole('button', { name: 'logout Salir' }).click();
  await page.getByPlaceholder('Nombre de usuario').click();
  await page.getByPlaceholder('Nombre de usuario').fill(cedula);
  await page.getByPlaceholder('Contraseña').click();
  await page.getByPlaceholder('Contraseña').fill('asdfghij');
  await page.getByRole('button', { name: 'Ingresar' }).click();
  await expect(page.locator('h1')).toContainText('Unidad de Diagnóstico, Investigación Psicopedagógica y Apoyo a la Inclusión (UDIPSAI)');
});