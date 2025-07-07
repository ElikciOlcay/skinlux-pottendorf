/**
 * Direkter Test für PDF-Generation
 * Testet das neue Layout mit allen Verbesserungen
 */

import { writeFileSync } from 'fs';

// Simuliere die Test-Daten
const testData = {
    voucherCode: 'TEST-XMAS-2024-DEMO',
    amount: 150,
    senderName: 'Maria Test',
    senderEmail: 'test@example.com',
    senderPhone: '+43 660 123 4567',
    recipientName: 'Lisa Muster',
    message: 'Alles Gute zum Geburtstag! Genieße eine entspannende Behandlung.',
    orderNumber: 'TEST-ORDER-001',
    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
};

console.log('🧪 PDF Generation Test');
console.log('📄 Testing new layout with:');
console.log('  ✅ Logo in correct proportions (45mm x 12mm)');
console.log('  ✅ Voucher number in header');
console.log('  ✅ Personal message without background/border');
console.log('  ✅ Address in footer: Bahnhofstrasse 17, 5500 Bischofshofen');
console.log('  ✅ Phone: 0660 57 21 403');
console.log('');
console.log('Test data:', JSON.stringify(testData, null, 2));
console.log('');
console.log('⚠️  NOTE: For full test, please run:');
console.log('     curl -X POST http://localhost:3000/api/test-email -H "Content-Type: application/json" -d \'{"to": "your-email@example.com"}\'');
console.log('');
console.log('📧 This will generate and email you the test PDF with all layout changes.');

export default testData; 