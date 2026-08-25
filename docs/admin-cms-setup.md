# Admin CMS setup

Esta etapa prepara Supabase y el panel privado `/admin` sin cambiar la tienda publica.
La web publica sigue consumiendo `src/mock/packages.js`.

## 1. Crear proyecto de Supabase

1. Crear un proyecto desde el dashboard de Supabase.
2. Guardar el Project URL.
3. Crear o copiar una Publishable key para uso client-side.
4. Si el proyecto todavia usa claves legacy, se puede usar la anon key como alternativa client-side.

No usar `service_role`, secret keys ni credenciales administrativas en React.

## 2. Variables de entorno

Crear un archivo `.env.local` en la raiz del proyecto:

```env
REACT_APP_SUPABASE_URL=https://tu-proyecto.supabase.co
REACT_APP_SUPABASE_PUBLISHABLE_KEY=tu_publishable_key
```

CRA solo expone variables que empiezan con `REACT_APP_`.

## 3. Ejecutar migraciones

La migracion inicial esta versionada en:

```text
supabase/migrations/20260825000100_admin_cms_base.sql
```

Opcion con Supabase CLI:

```bash
supabase link --project-ref <project-ref>
supabase db push
```

Opcion manual:

1. Abrir el SQL Editor en Supabase.
2. Copiar el contenido de la migracion.
3. Ejecutarlo una sola vez en el proyecto correcto.

## 4. Crear primer usuario administrador

1. En Supabase Auth, crear el usuario administrador con email y contrasena.
2. Copiar el `id` del usuario creado.
3. Ejecutar en SQL Editor:

```sql
insert into public.admin_users (user_id)
values ('USER_ID_DE_SUPABASE_AUTH');
```

Ese alta inicial se hace manualmente porque no existe registro publico de administradores.

## 5. Bucket de Storage

La migracion crea el bucket publico:

```text
catalog
```

Estructura prevista para la etapa de carga:

```text
products/
  {product-slug}/
    card/
    gallery/
    size-guide/

site/
  banners/
  hero/
```

Las imagenes se pueden leer publicamente desde el bucket. Solo usuarios autenticados y presentes en `admin_users` pueden subir, actualizar o borrar archivos.

## 6. Levantar local

```bash
npm install
npm start
```

Abrir:

```text
http://localhost:3000/admin/login
```

## 7. Verificar login

1. Ingresar con el usuario creado en Supabase Auth.
2. Si el usuario esta en `admin_users`, debe redirigir a `/admin/products`.
3. Si el usuario no esta en `admin_users`, el panel no debe mostrarse y la sesion se cierra.

## 8. Verificar productos

Abrir:

```text
http://localhost:3000/admin/products
```

La pantalla consulta la tabla `products` en Supabase. En esta etapa puede mostrar:

```text
No hay productos cargados
```

Eso es correcto hasta ejecutar la migracion de contenido en la proxima etapa.

## 9. Variables faltantes si no conecta

Si `/admin/login` muestra que Supabase no esta configurado, falta cargar:

```text
REACT_APP_SUPABASE_URL
REACT_APP_SUPABASE_PUBLISHABLE_KEY
```

Reiniciar `npm start` despues de cambiar variables de entorno.
