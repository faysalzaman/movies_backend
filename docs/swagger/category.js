/**
 * @swagger
 * /api/category/create:
 *   post:
 *     summary: Create a new category
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file for the category
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Bad request - Image is required or Category already exists
 */

/**
 * @swagger
 * /api/category/all:
 *   get:
 *     summary: Get all categories
 *     responses:
 *       200:
 *         description: Categories fetched successfully
 */

/**
 * @swagger
 * /api/category/delete/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to delete
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error - Error while deleting image
 */

/**
 * @swagger
 * /api/category/update/{id}:
 *   put:
 *     summary: Update a category by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the category
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The new image file for the category
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 */

/**
 * @swagger
 * /api/category/{id}:
 *   get:
 *     summary: Get a category by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to retrieve
 *     responses:
 *       200:
 *         description: Category fetched successfully
 *       404:
 *         description: Category not found
 */
