/**
 * clear-db.mjs
 * One-time script to delete ALL documents from the `projects` and `products`
 * collections in the MongoDB `eflash` database.
 * Run with:  node scripts/clear-db.mjs
 */

import { MongoClient } from 'mongodb';

const MONGODB_URI =
    process.env.MONGODB_URI ||
    'mongodb+srv://Eflash24:Eflash24@cluster0.fjn7skv.mongodb.net/?appName=Cluster0';

async function main() {
    const client = new MongoClient(MONGODB_URI);

    try {
        console.log('Connecting to MongoDB…');
        await client.connect();
        const db = client.db('eflash');

        // ── Clear projects ──────────────────────────────────────────────────────
        const projectsCollection = db.collection('projects');
        const projectCount = await projectsCollection.countDocuments();
        console.log(`Found ${projectCount} project(s) — deleting all…`);
        const projectResult = await projectsCollection.deleteMany({});
        console.log(`✅ Deleted ${projectResult.deletedCount} project(s).`);

        // ── Clear products ──────────────────────────────────────────────────────
        const productsCollection = db.collection('products');
        const productCount = await productsCollection.countDocuments();
        console.log(`Found ${productCount} product(s) — deleting all…`);
        const productResult = await productsCollection.deleteMany({});
        console.log(`✅ Deleted ${productResult.deletedCount} product(s).`);

        console.log('\n🎉 Database cleared successfully! Both collections are now empty.');
    } catch (err) {
        console.error('❌ Error clearing database:', err.message);
        process.exit(1);
    } finally {
        await client.close();
    }
}

main();
