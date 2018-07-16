<template>
    <div>
        <el-table :data="foods" stripe style="width: 100%;">
            <el-table-column prop="foodName"></el-table-column>
            <el-table-column
                    fixed="right"
                    label="Operations"
                    width="120">
                <template slot-scope="scope">
                    <el-button
                            @click.native.prevent="updateData(scope.row)"
                            type="default"
                            icon="el-icon-edit"
                            size="small">
                    </el-button>
                    <el-button
                            @click.native.prevent="removeData(scope.row.id)"
                            type="danger"
                            icon="el-icon-delete"
                            size="small">
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin: 20px 0;"></div>
        <el-button type="primary" @click="insertData" style="display: block; width: 100% ">เพิ่มรายการอาหารใหม่</el-button>
        <div style="margin: 5em 0;"></div>
        <el-dialog
                title="จะลบจริงดิ"
                :visible.sync="isRemoving"
                width="80%">
            <span>แน่ใจนะ?</span>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isRemoving = false">ไม่ลบ</el-button>
                <el-button type="danger" @click="removeData(removingId)">เอาดิ! ลบเลย</el-button>
            </div>
        </el-dialog>
        <el-dialog
                title="แก้ไข"
                :visible.sync="isEditing"
                width="80%">
            <span>ชื่ออาหาร</span>
            <el-input placeholder="ก๋วยเตี๋ยว" v-model="editData.foodName"></el-input>
            <div style="margin: 20px 0;"></div>
            <span>กินที่ไหน</span>
            <el-input placeholder="พานโอชา" v-model="editData.foodLocation"></el-input>
            <div style="margin: 20px 0;"></div>
            <span>ให้ออกมากเท่าไหร่</span>
            <el-input-number style="display: block;" v-model="editData.foodRate" :precision="2" controls-position="right" :min="0" :step="0.1" :max="1"></el-input-number>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isEditing = false">ไม่แก้</el-button>
                <el-button type="primary" @click="updateData(removingId)">แก้ไข</el-button>
            </div>
        </el-dialog>
        <el-dialog
                title="เพิ่มรายการอาหาร"
                :visible.sync="isCreating"
                width="80%">
            <span>ชื่ออาหาร</span>
            <el-input placeholder="ก๋วยเตี๋ยว" v-model="editData.foodName"></el-input>
            <div style="margin: 20px 0;"></div>
            <span>กินที่ไหน</span>
            <el-input placeholder="พานโอชา" v-model="editData.foodLocation"></el-input>
            <div style="margin: 20px 0;"></div>
            <span>ให้ออกมากเท่าไหร่</span>
            <el-input-number style="display: block;" v-model="editData.foodRate" :precision="2" controls-position="right" :min="0" :step="0.1" :max="1"></el-input-number>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isCreating = false">ไม่เพิ่ม</el-button>
                <el-button type="primary" @click="insertData()">เพิ่ม</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {db} from "../main";

    export default {
        name: "FoodListing",
        data() {
            return {
                foods: [],
                isEditing: false,
                isRemoving: false,
                removingId: "",
                editData: {},
                isCreating: false
            }
        },
        firestore() {
            return {
                foods: db.collection('foods')
            }
        },
        methods: {
            removeData(id) {
// eslint-disable-next-line no-console
                console.log(id)
                if(this.isRemoving){
                    db.collection('foods').doc(id).delete()
                    this.isRemoving = false
                    return
                }
                this.removingId = id
                this.isRemoving = true
            },
            updateData(id){
                if(this.isEditing){
                    db.collection('foods').doc(this.removingId).update(this.editData)
                    this.isEditing = false
                    return
                }
                this.removingId = id.id
                this.editData = id
                this.isEditing = true
            },
            insertData() {
                if(this.isCreating){
                    db.collection('foods').add(this.editData)
                    this.isCreating = false
                    return
                }
                this.isCreating = true
                this.editData = {foodName: "", foodLocation: "", foodRate: 1}
            }
        }
    }
</script>

<style>

</style>