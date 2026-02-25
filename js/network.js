/* ============================================
   HackSim - Network Simulation
   ============================================ */

const Network = (() => {
    // Server database - each mission has associated servers
    const servers = {
        // === TUTORIAL ===
        '10.0.0.1': {
            name: 'tutorial-server',
            os: 'Linux 5.4',
            ports: [
                { port: 22, service: 'SSH', state: 'open', version: 'OpenSSH 8.2' },
                { port: 80, service: 'HTTP', state: 'open', version: 'Apache 2.4.41' }
            ],
            firewall: false,
            filesystem: {
                '/': ['home', 'var', 'etc', 'tmp'],
                '/home': ['user'],
                '/home/user': ['readme.txt', 'notes.txt'],
                '/var': ['log'],
                '/var/log': ['access.log'],
                '/etc': ['passwd', 'shadow', 'hostname'],
                '/tmp': ['test.txt']
            },
            files: {
                '/home/user/readme.txt': '¡Bienvenido al servidor de tutorial!\nEste es un servidor de práctica para aprender los comandos básicos.\nUsa "ls" para listar archivos y "cat" para leerlos.',
                '/home/user/notes.txt': 'TODO: Cambiar el password por defecto\nTODO: Actualizar Apache\nNota: El password del admin es "admin123" (temporal)',
                '/var/log/access.log': '192.168.1.1 - - [25/Feb/2026:10:00:01] "GET / HTTP/1.1" 200\n192.168.1.1 - - [25/Feb/2026:10:00:05] "GET /admin HTTP/1.1" 403\n10.0.0.99 - - [25/Feb/2026:10:15:00] "POST /login HTTP/1.1" 200',
                '/etc/passwd': 'root:x:0:0:root:/root:/bin/bash\nuser:x:1000:1000:user:/home/user:/bin/bash\nadmin:x:1001:1001:admin:/home/admin:/bin/bash',
                '/etc/shadow': '[ACCESO DENEGADO - Se requieren privilegios root]',
                '/etc/hostname': 'tutorial-server',
                '/tmp/test.txt': 'archivo temporal de prueba'
            },
            credentials: { user: 'admin', pass: 'admin123' },
            vulnerability: null,
            missionId: 'tutorial'
        },

        // === MISSION 2: RECON ===
        '192.168.1.50': {
            name: 'web-server-alpha',
            os: 'Ubuntu 20.04',
            ports: [
                { port: 21, service: 'FTP', state: 'open', version: 'vsftpd 3.0.3' },
                { port: 22, service: 'SSH', state: 'open', version: 'OpenSSH 8.2' },
                { port: 80, service: 'HTTP', state: 'open', version: 'nginx 1.18.0' },
                { port: 443, service: 'HTTPS', state: 'open', version: 'nginx 1.18.0' },
                { port: 3306, service: 'MySQL', state: 'filtered', version: 'MySQL 5.7' },
                { port: 8080, service: 'HTTP-Proxy', state: 'open', version: 'Squid 4.10' }
            ],
            firewall: false,
            filesystem: {
                '/': ['home', 'var', 'www'],
                '/home': ['admin'],
                '/home/admin': ['backup.zip', '.bash_history'],
                '/var': ['log'],
                '/var/log': ['auth.log', 'syslog'],
                '/www': ['html'],
                '/www/html': ['index.html', 'robots.txt']
            },
            files: {
                '/home/admin/.bash_history': 'mysql -u root -p\nscp backup.zip admin@192.168.1.100:/backups/\ncat /etc/shadow',
                '/home/admin/backup.zip': '[ARCHIVO BINARIO - 2.3MB]',
                '/var/log/auth.log': 'Failed password for admin from 10.0.0.5 port 22\nAccepted password for admin from 192.168.1.1 port 22\nFailed password for root from 10.0.0.99 port 22',
                '/www/html/index.html': '<html><head><title>Alpha Corp</title></head><body><h1>Bienvenido a Alpha Corp</h1></body></html>',
                '/www/html/robots.txt': 'User-agent: *\nDisallow: /admin/\nDisallow: /backup/\nDisallow: /secret/'
            },
            credentials: { user: 'admin', pass: 'alpha2024' },
            vulnerability: null,
            missionId: 'recon'
        },

        // === MISSION 3: WEAK PASSWORD ===
        '172.16.0.10': {
            name: 'legacy-server',
            os: 'Windows Server 2012',
            ports: [
                { port: 22, service: 'SSH', state: 'open', version: 'OpenSSH 7.4' },
                { port: 80, service: 'HTTP', state: 'open', version: 'IIS 8.5' },
                { port: 3389, service: 'RDP', state: 'open', version: 'Microsoft Terminal Services' }
            ],
            firewall: false,
            filesystem: {
                '/': ['Users', 'Windows', 'inetpub'],
                '/Users': ['Administrator', 'jsmith'],
                '/Users/Administrator': ['Desktop'],
                '/Users/Administrator/Desktop': ['passwords.txt', 'company_data.xlsx'],
                '/Users/jsmith': ['Documents'],
                '/Users/jsmith/Documents': ['report.docx']
            },
            files: {
                '/Users/Administrator/Desktop/passwords.txt': '=== LISTA DE PASSWORDS INTERNOS ===\nRouter: admin/admin\nWifi: CompanyWifi2024\nDB Server: sa/password123\nBackup: backup/backup2024',
                '/Users/Administrator/Desktop/company_data.xlsx': '[ARCHIVO DESCARGADO - Datos confidenciales de la empresa]',
                '/Users/jsmith/Documents/report.docx': 'Informe trimestral Q4 2025 - Confidencial'
            },
            credentials: { user: 'admin', pass: 'password123' },
            vulnerability: 'weak-password',
            missionId: 'weak_password'
        },

        // === MISSION 4: PHISHING ===
        '10.0.1.25': {
            name: 'mail-server',
            os: 'Linux Debian 11',
            ports: [
                { port: 25, service: 'SMTP', state: 'open', version: 'Postfix' },
                { port: 110, service: 'POP3', state: 'open', version: 'Dovecot' },
                { port: 143, service: 'IMAP', state: 'open', version: 'Dovecot' },
                { port: 443, service: 'HTTPS', state: 'open', version: 'Roundcube Webmail' }
            ],
            firewall: false,
            filesystem: {
                '/': ['mail', 'var'],
                '/mail': ['inbox'],
                '/mail/inbox': ['email_1.txt', 'email_2.txt', 'email_3.txt']
            },
            files: {
                '/mail/inbox/email_1.txt': 'De: security@g00gle-support.com\nPara: usuario@empresa.com\nAsunto: URGENTE: Su cuenta será suspendida\n\nEstimado usuario,\nHemos detectado actividad sospechosa en su cuenta.\nHaga clic aquí para verificar: http://g00gle-support.com/verify?id=12345\n\nAtentamente,\nEquipo de Seguridad de Google',
                '/mail/inbox/email_2.txt': 'De: rrhh@empresa.com\nPara: usuario@empresa.com\nAsunto: Actualización de beneficios\n\nHola,\nSe han actualizado los beneficios del plan de salud.\nPuedes revisarlos en el portal interno.\n\nSaludos,\nRecursos Humanos',
                '/mail/inbox/email_3.txt': 'De: admin@paypa1.com\nPara: usuario@empresa.com\nAsunto: Confirme su identidad - Transacción pendiente\n\nSe ha realizado una compra de $499.99 en su cuenta.\nSi NO fue usted, haga clic aquí INMEDIATAMENTE:\nhttp://paypa1.com/dispute?ref=X89231\n\nPayPal Security Team'
            },
            credentials: {},
            vulnerability: null,
            missionId: 'phishing'
        },

        // === MISSION 5: SQL INJECTION ===
        '192.168.10.100': {
            name: 'ecommerce-server',
            os: 'Ubuntu 22.04',
            ports: [
                { port: 80, service: 'HTTP', state: 'open', version: 'Apache 2.4.52' },
                { port: 443, service: 'HTTPS', state: 'open', version: 'Apache 2.4.52' },
                { port: 3306, service: 'MySQL', state: 'open', version: 'MySQL 8.0.28' }
            ],
            firewall: false,
            filesystem: {
                '/': ['var', 'etc'],
                '/var': ['www'],
                '/var/www': ['html'],
                '/var/www/html': ['index.php', 'login.php', 'config.php', 'db_dump.sql']
            },
            files: {
                '/var/www/html/index.php': '<?php include "config.php"; ?>\n<html><head><title>ShopMax</title></head>\n<body><h1>Tienda Online ShopMax</h1></body></html>',
                '/var/www/html/login.php': '<?php\n$user = $_POST["user"];\n$pass = $_POST["pass"];\n$query = "SELECT * FROM users WHERE user=\'$user\' AND pass=\'$pass\'";\n// VULNERABLE A SQL INJECTION - No hay sanitización\n?>',
                '/var/www/html/config.php': '<?php\n$db_host = "localhost";\n$db_user = "shopmax";\n$db_pass = "shop_db_2024";\n$db_name = "shopmax_db";\n?>',
                '/var/www/html/db_dump.sql': '-- ShopMax Database Dump\nCREATE TABLE users (id INT, user VARCHAR(50), pass VARCHAR(50), role VARCHAR(20));\nINSERT INTO users VALUES (1, "admin", "Sup3rS3cr3t!", "admin");\nINSERT INTO users VALUES (2, "user1", "password", "user");\nINSERT INTO users VALUES (3, "jdoe", "john2024", "user");'
            },
            credentials: { user: 'admin', pass: 'Sup3rS3cr3t!' },
            vulnerability: 'sql-injection',
            missionId: 'sql_injection'
        },

        // === MISSION 6: OUTDATED SERVER ===
        '10.10.10.50': {
            name: 'old-fileserver',
            os: 'CentOS 6.10 (EOL)',
            ports: [
                { port: 21, service: 'FTP', state: 'open', version: 'vsftpd 2.3.4 [VULNERABLE]' },
                { port: 22, service: 'SSH', state: 'open', version: 'OpenSSH 5.3' },
                { port: 80, service: 'HTTP', state: 'open', version: 'Apache 2.2.15' },
                { port: 445, service: 'SMB', state: 'open', version: 'Samba 3.6.9 [VULNERABLE - CVE-2017-7494]' }
            ],
            firewall: false,
            filesystem: {
                '/': ['home', 'shares', 'etc'],
                '/home': ['sysadmin'],
                '/home/sysadmin': ['todo.txt', 'update_log.txt'],
                '/shares': ['public', 'confidential'],
                '/shares/public': ['welcome.txt'],
                '/shares/confidential': ['financials.csv', 'employees.csv']
            },
            files: {
                '/home/sysadmin/todo.txt': 'TODO:\n- Actualizar el servidor (llevan 3 años pidiéndome esto)\n- Migrar a CentOS 8... o mejor a Rocky Linux\n- Parchear Samba (hay un CVE crítico)\n- Cambiar versión de FTP (también vulnerable)',
                '/home/sysadmin/update_log.txt': 'Última actualización del sistema: 2021-03-15\nÚltimo parche de seguridad: 2020-11-20\nEstado: CRÍTICO - Múltiples CVEs sin parchear',
                '/shares/public/welcome.txt': 'Bienvenido al servidor de archivos.\nRecuerde no almacenar información sensible aquí.',
                '/shares/confidential/financials.csv': '[DATOS FINANCIEROS DESCARGADOS - 156KB]',
                '/shares/confidential/employees.csv': '[DATOS DE EMPLEADOS DESCARGADOS - 89KB]'
            },
            credentials: { user: 'sysadmin', pass: 'changeme' },
            vulnerability: 'outdated-services',
            missionId: 'outdated_server'
        },

        // === MISSION 7: CRYPTO ===
        '172.16.5.5': {
            name: 'crypto-vault',
            os: 'FreeBSD 13',
            ports: [
                { port: 22, service: 'SSH', state: 'open', version: 'OpenSSH 8.8' },
                { port: 443, service: 'HTTPS', state: 'open', version: 'nginx 1.22' }
            ],
            firewall: false,
            filesystem: {
                '/': ['vault', 'keys'],
                '/vault': ['secret_message.enc', 'archive.enc', 'hint.txt'],
                '/keys': ['public.key', 'readme.txt']
            },
            files: {
                '/vault/secret_message.enc': 'Hvwh phqvdmh hvwd fliudgr frq Fhvdu +3. Od fodYh hv: GHFUBSWHG',
                '/vault/archive.enc': 'VGhlIHNlY3JldCBwYXNzd29yZCBpczogY3J5cHRvX21hc3Rlcl8yMDI0',
                '/vault/hint.txt': 'Pista 1: El primer archivo usa un cifrado clásico de desplazamiento.\nPista 2: El segundo archivo está en Base64.\nPista 3: Julio César estaría orgulloso del primer cifrado.',
                '/keys/public.key': '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...\n-----END PUBLIC KEY-----',
                '/keys/readme.txt': 'Este servidor almacena datos cifrados.\nCada archivo usa un método de cifrado diferente.\nDescifra los mensajes para completar la misión.'
            },
            credentials: {},
            vulnerability: null,
            missionId: 'crypto'
        },

        // === MISSION 8: SOCIAL ENGINEERING ===
        '192.168.50.1': {
            name: 'corporate-portal',
            os: 'Windows Server 2019',
            ports: [
                { port: 80, service: 'HTTP', state: 'open', version: 'IIS 10.0' },
                { port: 443, service: 'HTTPS', state: 'open', version: 'IIS 10.0' },
                { port: 389, service: 'LDAP', state: 'filtered', version: 'Active Directory' }
            ],
            firewall: false,
            filesystem: {
                '/': ['employees', 'intranet'],
                '/employees': ['directory.txt', 'org_chart.txt'],
                '/intranet': ['announcements.txt', 'it_policy.txt', 'help_desk.txt']
            },
            files: {
                '/employees/directory.txt': '=== DIRECTORIO DE EMPLEADOS ===\nCarlos Mendez - CEO - cmendez@megacorp.com\nLaura García - CTO - lgarcia@megacorp.com\nRoberto Silva - IT Admin - rsilva@megacorp.com\nAna Torres - RRHH - atorres@megacorp.com\nDiego López - Finanzas - dlopez@megacorp.com',
                '/employees/org_chart.txt': 'CEO: Carlos Mendez\n├── CTO: Laura García\n│   ├── IT Admin: Roberto Silva\n│   └── Dev Lead: [Vacante]\n├── CFO: [Sin designar]\n│   └── Finanzas: Diego López\n└── RRHH: Ana Torres',
                '/intranet/announcements.txt': 'AVISO: Cambio de contraseñas obligatorio el primer lunes de cada mes.\nAVISO: No compartir credenciales por email.\nAVISO: El help desk NUNCA pedirá tu contraseña.',
                '/intranet/it_policy.txt': 'Política de IT - MegaCorp\n- Las contraseñas deben tener min 12 caracteres\n- Se requiere MFA para acceso remoto\n- Reportar emails sospechosos a security@megacorp.com\n- El formato de usuario es: primera letra nombre + apellido (ej: rsilva)',
                '/intranet/help_desk.txt': 'Help Desk IT - Ext. 4500\nAdmin: Roberto Silva\nHorario: L-V 9:00-18:00\nPara reseteo de password: ticket en portal + aprobación de jefe directo'
            },
            credentials: { user: 'rsilva', pass: 'MegaCorp2024!' },
            vulnerability: 'social-engineering',
            missionId: 'social_engineering'
        },

        // === MISSION 9: FIREWALL ===
        '10.20.30.40': {
            name: 'secure-server',
            os: 'Ubuntu 22.04 (Hardened)',
            ports: [
                { port: 22, service: 'SSH', state: 'filtered', version: 'OpenSSH 9.0' },
                { port: 80, service: 'HTTP', state: 'filtered', version: 'nginx' },
                { port: 443, service: 'HTTPS', state: 'filtered', version: 'nginx' },
                { port: 8443, service: 'HTTPS-Alt', state: 'open', version: 'nginx 1.24' }
            ],
            firewall: true,
            firewallRules: [
                'DENY all from 0.0.0.0/0 to port 22',
                'DENY all from 0.0.0.0/0 to port 80',
                'ALLOW 10.20.30.0/24 to port 443',
                'ALLOW all to port 8443'
            ],
            filesystem: {
                '/': ['opt', 'var'],
                '/opt': ['app'],
                '/opt/app': ['config.yml', 'database.db', 'logs'],
                '/opt/app/logs': ['app.log'],
                '/var': ['firewall'],
                '/var/firewall': ['rules.conf', 'blocked.log']
            },
            files: {
                '/opt/app/config.yml': 'app:\n  name: SecureVault\n  port: 8443\n  admin_token: sv_tok3n_2024_s3cur3\n  database: /opt/app/database.db',
                '/opt/app/database.db': '[BASE DE DATOS DESCARGADA - Contiene registros financieros]',
                '/opt/app/logs/app.log': 'INFO: Server started on port 8443\nWARN: Failed login attempt from 10.0.0.5\nINFO: Admin session created from 10.20.30.1\nERROR: Database backup failed - disk full',
                '/var/firewall/rules.conf': '# Firewall Rules - Last updated 2026-01-15\n# Port 22: SSH - Internal only\n# Port 80/443: Web - Restricted\n# Port 8443: App - Open (oops, should be restricted too)\niptables -A INPUT -p tcp --dport 22 -j DROP\niptables -A INPUT -p tcp --dport 80 -j DROP\niptables -A INPUT -s 10.20.30.0/24 -p tcp --dport 443 -j ACCEPT',
                '/var/firewall/blocked.log': 'BLOCKED: 45.33.22.11 -> port 22 (SSH bruteforce)\nBLOCKED: 91.108.4.22 -> port 80 (Web scan)\nBLOCKED: 185.220.101.1 -> port 443 (Unauthorized)'
            },
            credentials: {},
            vulnerability: 'firewall-misconfiguration',
            missionId: 'firewall'
        },

        // === MISSION 10: PRIVILEGE ESCALATION ===
        '172.16.100.10': {
            name: 'dev-workstation',
            os: 'Ubuntu 22.04',
            ports: [
                { port: 22, service: 'SSH', state: 'open', version: 'OpenSSH 8.9' },
                { port: 8080, service: 'HTTP', state: 'open', version: 'Node.js Dev Server' }
            ],
            firewall: false,
            filesystem: {
                '/': ['home', 'etc', 'root', 'tmp'],
                '/home': ['developer'],
                '/home/developer': ['app', '.ssh', 'notes.txt'],
                '/home/developer/app': ['server.js', 'package.json'],
                '/home/developer/.ssh': ['id_rsa', 'authorized_keys'],
                '/etc': ['passwd', 'shadow', 'sudoers', 'crontab'],
                '/root': ['flag.txt', 'admin_panel.sh'],
                '/tmp': ['backup.sh']
            },
            files: {
                '/home/developer/notes.txt': 'Nota: Pedirle al admin que me quite el sudo sin password\nNota: El cron job de backup corre como root cada 5 min\nNota: El script de backup está en /tmp/ y es world-writable',
                '/home/developer/app/server.js': 'const express = require("express");\nconst app = express();\napp.listen(8080);',
                '/etc/passwd': 'root:x:0:0:root:/root:/bin/bash\ndeveloper:x:1000:1000::/home/developer:/bin/bash',
                '/etc/shadow': '[ACCESO DENEGADO]',
                '/etc/sudoers': 'root ALL=(ALL:ALL) ALL\ndeveloper ALL=(ALL) NOPASSWD: /usr/bin/vim, /usr/bin/find',
                '/etc/crontab': '*/5 * * * * root /tmp/backup.sh',
                '/tmp/backup.sh': '#!/bin/bash\n# Backup script - runs as root\ntar -czf /root/backup.tar.gz /home/developer/app\n# Permissions: -rwxrwxrwx (world writable!)',
                '/root/flag.txt': '¡ACCESO ROOT CONSEGUIDO!\nFlag: H4CK3R_PR1V3SC_M4ST3R\nHas demostrado escalada de privilegios exitosa.',
                '/root/admin_panel.sh': '#!/bin/bash\necho "Panel de Administración"\necho "Usuario: root"\necho "Nivel de acceso: TOTAL"'
            },
            credentials: { user: 'developer', pass: 'dev2024' },
            vulnerability: 'privilege-escalation',
            missionId: 'privesc'
        },

        // === MISSION 11: MAN IN THE MIDDLE ===
        '192.168.1.1': {
            name: 'gateway-router',
            os: 'RouterOS 6.49',
            ports: [
                { port: 22, service: 'SSH', state: 'open', version: 'Dropbear SSH' },
                { port: 80, service: 'HTTP', state: 'open', version: 'RouterOS WebUI' },
                { port: 443, service: 'HTTPS', state: 'open', version: 'Self-signed cert' }
            ],
            firewall: false,
            filesystem: {
                '/': ['config', 'logs', 'certs'],
                '/config': ['routing.conf', 'dhcp.conf', 'arp_table.txt'],
                '/logs': ['traffic.log', 'dns_queries.log'],
                '/certs': ['server.crt', 'ca.crt']
            },
            files: {
                '/config/routing.conf': 'interface: eth0 192.168.1.1/24\ngateway: 10.0.0.1\nDNS: 8.8.8.8, 8.8.4.4',
                '/config/arp_table.txt': 'IP: 192.168.1.10 -> MAC: AA:BB:CC:DD:EE:01 (desktop-pc)\nIP: 192.168.1.20 -> MAC: AA:BB:CC:DD:EE:02 (laptop-user)\nIP: 192.168.1.30 -> MAC: AA:BB:CC:DD:EE:03 (server-web)\nIP: 192.168.1.1  -> MAC: AA:BB:CC:DD:EE:FF (gateway)',
                '/logs/traffic.log': '192.168.1.10 -> bank.example.com:443 [HTTPS] 2.3KB\n192.168.1.20 -> social.example.com:80 [HTTP!] 1.1KB\n192.168.1.20 -> email.example.com:443 [HTTPS] 0.8KB\n192.168.1.10 -> shop.example.com:80 [HTTP!] 3.2KB',
                '/logs/dns_queries.log': '192.168.1.10: bank.example.com -> 93.184.216.34\n192.168.1.20: social.example.com -> 93.184.216.35\n192.168.1.20: email.example.com -> 93.184.216.36',
                '/certs/server.crt': 'Certificate:\n  Issuer: CN=Self-Signed\n  Subject: CN=gateway.local\n  NOT a trusted CA!\n  Validity: 2025-01-01 to 2026-12-31\n  WARNING: Self-signed certificates can be spoofed!'
            },
            credentials: { user: 'admin', pass: 'router_admin' },
            vulnerability: 'mitm',
            missionId: 'mitm'
        },

        // === MISSION 12: CORPORATE NETWORK ===
        '10.50.0.1': {
            name: 'corp-gateway',
            os: 'pfSense 2.7',
            ports: [
                { port: 22, service: 'SSH', state: 'filtered', version: 'OpenSSH' },
                { port: 443, service: 'HTTPS', state: 'open', version: 'pfSense WebUI' }
            ],
            firewall: true,
            filesystem: {
                '/': ['config', 'network_map'],
                '/config': ['vlans.conf', 'firewall.conf'],
                '/network_map': ['topology.txt', 'servers.txt', 'credentials.txt']
            },
            files: {
                '/config/vlans.conf': 'VLAN 10: Empleados (10.50.10.0/24)\nVLAN 20: Servidores (10.50.20.0/24)\nVLAN 30: DMZ (10.50.30.0/24)\nVLAN 99: Management (10.50.99.0/24)',
                '/network_map/topology.txt': 'Internet <-> Firewall (10.50.0.1) <-> Core Switch\n  ├── VLAN 10: Empleados\n  ├── VLAN 20: Servidores internos\n  │   ├── 10.50.20.10 (DB Server)\n  │   └── 10.50.20.20 (File Server)\n  ├── VLAN 30: DMZ\n  │   └── 10.50.30.10 (Web Server público)\n  └── VLAN 99: Management',
                '/network_map/servers.txt': 'DB Server: 10.50.20.10 - PostgreSQL 14\nFile Server: 10.50.20.20 - Samba 4.15\nWeb Server: 10.50.30.10 - nginx\nDC: 10.50.99.10 - Windows Server 2022',
                '/network_map/credentials.txt': '[CIFRADO] Usa la clave del File Server para descifrar:\nQ2xhdmU6IENvcnBEQjIwMjQh'
            },
            credentials: {},
            vulnerability: 'lateral-movement',
            missionId: 'corporate'
        },

        // === MISSION 13: ZERO DAY ===
        '203.0.113.50': {
            name: 'target-webapp',
            os: 'Debian 12',
            ports: [
                { port: 80, service: 'HTTP', state: 'open', version: 'CustomApp 3.2.1' },
                { port: 443, service: 'HTTPS', state: 'open', version: 'CustomApp 3.2.1' },
                { port: 9090, service: 'Debug', state: 'open', version: 'Debug Console [NOT FOR PRODUCTION]' }
            ],
            firewall: true,
            filesystem: {
                '/': ['app', 'var'],
                '/app': ['src', 'config', 'CHANGELOG.md'],
                '/app/src': ['main.py', 'auth.py', 'upload.py'],
                '/app/config': ['app.conf'],
                '/var': ['log'],
                '/var/log': ['app.log', 'error.log']
            },
            files: {
                '/app/CHANGELOG.md': 'v3.2.1 - Bug fixes\nv3.2.0 - Added file upload feature\nv3.1.0 - New auth system\nTODO: Fix input validation in upload.py (CRITICAL)',
                '/app/src/upload.py': 'def handle_upload(file):\n    # TODO: Validate file type!\n    # WARNING: No validation = arbitrary file upload\n    filename = file.filename  # No sanitization!\n    file.save(f"/app/uploads/{filename}")\n    return f"Uploaded: {filename}"',
                '/app/src/auth.py': 'def check_auth(token):\n    # Debug backdoor - REMOVE BEFORE PRODUCTION\n    if token == "debug_bypass_2024":\n        return True\n    return verify_jwt(token)',
                '/app/config/app.conf': 'DEBUG=true\nSECRET_KEY=super_secret_key_change_me\nDEBUG_PORT=9090\nALLOW_DEBUG_CONSOLE=true',
                '/var/log/error.log': 'ERROR: Unhandled exception in upload.py line 4\nERROR: File validation bypass detected\nWARN: Debug console exposed on port 9090'
            },
            credentials: {},
            vulnerability: 'zero-day',
            missionId: 'zeroday'
        },

        // === MISSION 14: RANSOMWARE ===
        '192.168.200.10': {
            name: 'infected-server',
            os: 'Windows Server 2019',
            ports: [
                { port: 22, service: 'SSH', state: 'open', version: 'OpenSSH' },
                { port: 80, service: 'HTTP', state: 'open', version: 'IIS 10.0' },
                { port: 445, service: 'SMB', state: 'open', version: 'SMBv3' }
            ],
            firewall: false,
            filesystem: {
                '/': ['Users', 'Ransomware', 'Backup'],
                '/Users': ['admin'],
                '/Users/admin': ['Desktop'],
                '/Users/admin/Desktop': ['ENCRYPTED_FILES', 'README_DECRYPT.txt', 'ransom_analysis.txt'],
                '/Ransomware': ['payload.exe.analysis', 'kill_switch.txt', 'decryption_key.txt'],
                '/Backup': ['backup_2025.img', 'restore_instructions.txt']
            },
            files: {
                '/Users/admin/Desktop/README_DECRYPT.txt': '*** TODOS TUS ARCHIVOS HAN SIDO CIFRADOS ***\nPara recuperarlos, envía 2 BTC a: bc1q...\nTienes 72 horas.\nNO intentes descifrar por tu cuenta.\n\n*** YOUR FILES HAVE BEEN ENCRYPTED ***',
                '/Users/admin/Desktop/ransom_analysis.txt': 'Análisis del ransomware:\n- Tipo: Crypto-ransomware\n- Cifrado: AES-256 + RSA-2048\n- Vector de entrada: Email phishing con macro maliciosa\n- Fecha de infección: 2026-02-20\n- Archivos afectados: 15,432',
                '/Ransomware/payload.exe.analysis': 'Análisis estático del payload:\n- Conecta a C&C: 45.33.22.11:4444\n- Genera clave AES única por máquina\n- Kill switch: check DNS for "stopransomware.local"\n- Vulnerabilidad: La clave se almacena en memoria temporalmente',
                '/Ransomware/kill_switch.txt': 'KILL SWITCH ENCONTRADO:\nEl ransomware verifica si el dominio "stopransomware.local" existe.\nSi existe, NO cifra archivos nuevos.\nRegistrar este dominio detiene la propagación.',
                '/Ransomware/decryption_key.txt': 'Clave de descifrado extraída de memoria:\nAES-KEY: 7f8a9b2c3d4e5f6a7b8c9d0e1f2a3b4c\nUsa esta clave con el comando decrypt para recuperar archivos.',
                '/Backup/backup_2025.img': '[IMAGEN DE BACKUP - 50GB - Última copia limpia antes de la infección]',
                '/Backup/restore_instructions.txt': 'Instrucciones de restauración:\n1. Aislar el servidor de la red\n2. Activar kill switch\n3. Restaurar desde backup limpio\n4. Aplicar parches de seguridad\n5. Cambiar TODAS las contraseñas\n6. Implementar política de backups 3-2-1'
            },
            credentials: {},
            vulnerability: 'ransomware',
            missionId: 'ransomware'
        },

        // === MISSION 15: FINAL ===
        '10.99.0.1': {
            name: 'nexus-corp-main',
            os: 'Custom OS (NexusOS 2.0)',
            ports: [
                { port: 22, service: 'SSH', state: 'filtered', version: 'OpenSSH 9.2' },
                { port: 80, service: 'HTTP', state: 'open', version: 'NexusWeb 1.0' },
                { port: 443, service: 'HTTPS', state: 'open', version: 'NexusWeb 1.0' },
                { port: 3306, service: 'MySQL', state: 'filtered', version: 'MySQL 8.0' },
                { port: 8080, service: 'API', state: 'open', version: 'NexusAPI 2.0' },
                { port: 9090, service: 'Admin', state: 'filtered', version: 'NexusAdmin' }
            ],
            firewall: true,
            firewallRules: [
                'DENY all from external to port 22',
                'DENY all from external to port 3306',
                'DENY all from external to port 9090',
                'ALLOW all to port 80,443,8080'
            ],
            filesystem: {
                '/': ['nexus', 'secrets', 'evidence'],
                '/nexus': ['app', 'database', 'admin'],
                '/nexus/app': ['api_docs.txt', 'vulnerabilities.txt'],
                '/nexus/database': ['users.db', 'transactions.db'],
                '/nexus/admin': ['master_key.txt', 'surveillance_logs.txt'],
                '/secrets': ['project_phoenix.txt', 'illegal_operations.txt'],
                '/evidence': ['financial_fraud.csv', 'whistleblower_report.txt']
            },
            files: {
                '/nexus/app/api_docs.txt': 'NexusAPI v2.0\nEndpoints:\n  POST /api/auth - Login\n  GET /api/users - List users (requires auth)\n  POST /api/transfer - Financial transfer\n  GET /api/admin - Admin panel (filtered)',
                '/nexus/app/vulnerabilities.txt': 'VULNERABILIDADES ENCONTRADAS:\n1. API Auth: SQL Injection en /api/auth\n2. Firewall: Puerto 8080 no filtrado\n3. Admin: Default credentials no cambiadas\n4. DB: Backup expuesto en /api/backup',
                '/nexus/database/users.db': 'admin:$2b$12$hash... (role: admin)\nceo:$2b$12$hash... (role: executive)\nauditor:$2b$12$hash... (role: auditor)',
                '/nexus/admin/master_key.txt': 'NEXUS CORP - MASTER ACCESS KEY\nKey: NX-2026-M4ST3R-K3Y-F1N4L\nAccess Level: UNRESTRICTED\n\n¡Has obtenido acceso total al sistema!',
                '/secrets/project_phoenix.txt': 'PROYECTO PHOENIX - CONFIDENCIAL\nNexus Corp ha estado recolectando datos de usuarios sin consentimiento.\nLos datos se venden a terceros a través de subsidiarias offshore.',
                '/secrets/illegal_operations.txt': 'Operaciones ilegales documentadas:\n- Lavado de dinero a través de crypto\n- Venta de datos personales\n- Evasión fiscal en 3 jurisdicciones',
                '/evidence/financial_fraud.csv': '[EVIDENCIA DESCARGADA - Transacciones fraudulentas documentadas]',
                '/evidence/whistleblower_report.txt': 'REPORTE FINAL:\nToda la evidencia ha sido recopilada y enviada a las autoridades.\nNexus Corp será investigada por sus crímenes digitales.\n\n¡Felicidades, has completado HackSim!\nHas aprendido sobre ciberseguridad de forma práctica.\nRecuerda: usa estos conocimientos de forma ética y responsable.'
            },
            credentials: { user: 'admin', pass: 'nexus_admin_2026' },
            vulnerability: 'multi-vector',
            missionId: 'final'
        }
    };

    return {
        getServer(ip) {
            return servers[ip] || null;
        },

        getServerByMission(missionId) {
            for (const [ip, server] of Object.entries(servers)) {
                if (server.missionId === missionId) return { ip, ...server };
            }
            return null;
        },

        listDirectory(ip, path) {
            const server = servers[ip];
            if (!server) return null;
            const normalizedPath = path.replace(/\/+$/, '') || '/';
            return server.filesystem[normalizedPath] || null;
        },

        readFile(ip, path) {
            const server = servers[ip];
            if (!server) return null;
            return server.files[path] || null;
        },

        getOpenPorts(ip) {
            const server = servers[ip];
            if (!server) return [];
            return server.ports.filter(p => p.state === 'open');
        },

        getAllPorts(ip) {
            const server = servers[ip];
            if (!server) return [];
            return server.ports;
        },

        hasFirewall(ip) {
            const server = servers[ip];
            return server ? server.firewall : false;
        },

        getFirewallRules(ip) {
            const server = servers[ip];
            return server && server.firewallRules ? server.firewallRules : [];
        },

        checkCredentials(ip, user, pass) {
            const server = servers[ip];
            if (!server || !server.credentials) return false;
            return server.credentials.user === user && server.credentials.pass === pass;
        },

        getServerName(ip) {
            const server = servers[ip];
            return server ? server.name : 'unknown';
        },

        getServerOS(ip) {
            const server = servers[ip];
            return server ? server.os : 'unknown';
        },

        resolvePath(currentPath, target) {
            if (target === '/') return '/';
            if (target === '..') {
                const parts = currentPath.split('/').filter(Boolean);
                parts.pop();
                return '/' + parts.join('/');
            }
            if (target.startsWith('/')) return target;
            const base = currentPath === '/' ? '' : currentPath;
            return base + '/' + target;
        },

        // Check if path is a directory
        isDirectory(ip, path) {
            const server = servers[ip];
            if (!server) return false;
            const normalizedPath = path.replace(/\/+$/, '') || '/';
            return server.filesystem.hasOwnProperty(normalizedPath);
        },

        // Check if path is a file
        isFile(ip, path) {
            const server = servers[ip];
            if (!server) return false;
            return server.files.hasOwnProperty(path);
        }
    };
})();
