<template>
  <div v-if="searchData.length" key="searchData">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-position="right"
      :label-width="labelWidth"
    >
      <el-row>
        <template v-for="(item, index) in searchData">
          <el-col :xs="item.xs" :sm="item.xs" :md="item.md" :lg="item.lg" :xl="item.xl" :key="index" v-if="item.hasOwnProperty('block') ? item.block : true">
            <el-form-item
              :label="item.label"
              :prop="item.model"
              :label-width="item.labelWidth ? item.labelWidth : labelWidth"
            >
              <el-input
                v-if="item.type === 'input'"
                key="input"
                v-model="ruleForm[item.model]"
                :placeholder="item.placeholder || ''"
                :clearable="item.clearable || false"
                :type="item.inputType || 'text'"
              >
              </el-input>
              <el-select
                v-if="item.type === 'select'"
                key="select"
                v-model="ruleForm[item.model]"
                :placeholder="item.placeholder || ''"
                :clearable="item.clearable || false"
              >
                <el-option
                  v-for="op in item.options"
                  :value="op.value"
                  :label="op.label"
                  :key="op.value"
                ></el-option>
              </el-select>
              <el-date-picker
                v-if="item.type === 'date'"
                key="date"
                @change="(time)=>setTime(item,time)"
                :value-format="item.valueFormat || 'yyyy-MM-dd'"
                :format="item.format || 'yyyy-MM-dd'"
                v-model="ruleForm[item.model]"
                :picker-options="pickerOptions"
                :type="item.dateType || 'date'"
                range-separator="~"
                :start-placeholder="item.startPlaceholder || ''"
                :end-placeholder="item.endPlaceholder || ''"
                :placeholder="item.placeholder || ''"
                :clearable="item.clearable || false"
              ></el-date-picker>
              <el-radio-group
                v-if="item.type === 'radio'"
                key="radio"
                v-model="ruleForm[item.model]"
                @input="change(item)"
              >
                <el-radio v-for="op in item.options" :label="op.value" :key="op.value">{{op.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </template>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div class="btn-box">
            <el-button @click="reSetParams">??????</el-button>
            <el-button type="primary" @click="setParams">??????</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    searchData: {
      type: Array,
      default: () => {
        return []
      }
    },
    labelWidth: {
      type: String,
      default: '100px'
    }
  },
  data () {
    return {
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      ruleForm: {},
      rules: {}
    }
  },
  watch: {
    searchData: {
      deep: true,
      handler () {
        this.setDataRules()
      }
    }
  },
  created () {
    this.setDataRules()
    // ????????????$bus??????validate??????
    this.$bus.$on('validate', (val) => {
      this.setParams()
    })
  },
  methods: {
    change (item) {
      if (Object.prototype.hasOwnProperty.call(item, 'change')) {
        this.$emit(item.change, this.ruleForm)
      }
    },
    setDataRules () {
      if (!this.searchData || this.searchData.length === 0) {
        return false
      }
      // ?????????????????? ??????????????????????????????ruleForm ??? rules
      this.searchData.forEach((item) => {
        if (item.targetModel) {
          // ?????????targetModel ???????????? ????????????????????????????????????????????????
          this.$set(this.ruleForm, item.model, item.value || [])
          item.targetModel.forEach((m) => {
            this.$set(this.ruleForm, m, '')
          })
        } else {
          if (!Object.prototype.hasOwnProperty.call(this.ruleForm, item.model)) {
            this.$set(this.ruleForm, item.model, item.value || '')
          }
        }
        this.rules[item.model] = item.rules || []
      })
      // this.$parent.setSearchParams(this.ruleForm)
    },
    // ??????????????????
    reSetParams () {
      this.$refs.ruleForm.resetFields()
    },
    // ???????????????????????????tableSearch?????????????????????????????????
    setParams () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // this.$emit('tableSearch', this.ruleForm)
          this.$parent.searchParams = this.ruleForm
          this.$emit('tableSearch')
        }
      })
    },
    // ???????????????????????????????????????????????????????????????
    setTime (item, time) {
      console.log(time)
      if (Object.prototype.hasOwnProperty.call(item, 'targetModel')) {
        const dateList = this.ruleForm[item.model]
        item.targetModel.forEach((ele, index) => {
          this.ruleForm[ele] = dateList[index]
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-select {
  width: 100%;
}
/deep/ .el-date-editor {
  width: 100%;
}
.btn-box {
  display: flex;
  justify-content: flex-end;
}
</style>
